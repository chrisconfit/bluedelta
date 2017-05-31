'use strict';
var rfr = require('rfr');
var logger = rfr('util/logger');
var config = rfr('config');
var AWS = config.AWS;
var cf = rfr('/util/cloudFormation');
var cognito = rfr('util/cognito');
var ag = new AWS.APIGateway();
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');

function process(definition, path, method, accountId, region) {
  definition['x-amazon-apigateway-integration'] = {
    requestTemplates: {
      'application/json':
        `#set($allParams = $input.params())
        {
          "operation": "com.hatboysoftware.blue-delta.${definition.operationId}",
          "identityId": "$context.identity.cognitoIdentityId",
          "body" : $input.json('$'),
          "params" : {
            #foreach($type in $allParams.keySet())
                #set($params = $allParams.get($type))
            "$type" : {
              #foreach($paramName in $params.keySet())
              "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
                  #if($foreach.hasNext),#end
              #end
            }
                #if($foreach.hasNext),#end
            #end
          }
        }
        `,
    },
    uri: `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${region}` +
    `:${accountId}:function:${config.getResourcePrefix()}api/invocations`,
    passthroughBehavior: 'when_no_match',
    httpMethod: 'POST',
    type: 'aws',
  };
}

function processPath(definition) {
  let methods = `'${Object.keys(definition).join(',').toUpperCase()}'`;
  definition.options = {
    consumes: ['application/json'],
    produces: ['application/json'],
    parameters: definition.get.parameters,
    responses: {
      200: {
        description: '200 response',
        headers: {
          'Access-Control-Allow-Origin': {
            type: 'string'
          },
          'Access-Control-Allow-Methods': {
            type: 'string'
          },
          'Access-Control-Allow-Headers': {
            type: 'string'
          },
        }
      }
    },
    'x-amazon-apigateway-integration': {
      passthroughBehavior: 'when_no_match',
      requestTemplates: {
        'application/json': '{"statusCode": 200}',
      },
      responses: {
        default: {
          statusCode: 200,
          responseParameters: {
            'method.response.header.Access-Control-Allow-Methods': methods,
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            'method.response.header.Access-Control-Allow-Origin': "'*'"
          }
        }
      },
      type: 'mock'
    }
  };
}

function processSecurityDefinitions(accountId, region, userPoolId) {
  let securityDefinitions = {};
  // Generate custom authorizer definition
  let customAuthorizerUri = `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/arn:aws:lambda:` +
    `${region}:${accountId}:function:${config.getResourcePrefix()}authorizer/invocations`;
  securityDefinitions.sigv4 = {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    'x-amazon-apigateway-authtype': 'awsSigv4'
  };
  securityDefinitions['blue-delta-custom-authorizer'] = {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    'x-amazon-apigateway-authtype': 'custom',
    'x-amazon-apigateway-authorizer': {
      authorizerResultTtlInSeconds: 300,
      authorizerUri: customAuthorizerUri,
      type: 'token'
    }
  };
  securityDefinitions['blue-delta-userPool-authorizer'] = {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    'x-amazon-apigateway-authtype': 'cognito_user_pools',
    'x-amazon-apigateway-authorizer': {
      type: 'cognito_user_pools',
      providerARNs: [
        `arn:aws:cognito-idp:${region}:${accountId}:userpool/${userPoolId}`
      ]
    }
  };
  return securityDefinitions;
}

function getApiInvokeUrl() {
  return cf.getStackOutputs().then((cfOutputs) => {
    let apiInvokeUrl = `https://${cfOutputs.ApiGatewayRestApi}.execute-api.${config.AWS_REGION}.amazonaws.com/${config.ENVIRONMENT_STAGE}`;
    return apiInvokeUrl;
  });
}

function getApiDoc(restAPI, accountId, region, userPoolId) {
  let api = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'swagger', 'BlueDeltaAPI.yml')).toString());
  api.host = `${restAPI}.execute-api.${region}.amazonaws.com`;
  for (let path in api.paths) {
    for (let method in api.paths[path]) {
      let definition = api.paths[path][method];
      process(definition, path, method, accountId, region);
    }
    processPath(api.paths[path]);
  }
  api.securityDefinitions = processSecurityDefinitions(accountId, region, userPoolId);
  return JSON.stringify(api);
}

function importApi() {
  return cf.getStackOutputs().then((cfOutputs) => {
    let restApi = cfOutputs.ApiGatewayRestApi;
    cognito.getUserPoolId().then((userPoolId) => {
      let params = {
        restApiId: restApi,
        mode: 'overwrite',
        body: getApiDoc(restApi, cfOutputs.AwsAccountId, cfOutputs.AwsRegion, userPoolId)
      };
      return params;
    }).then(putRestApi);
  });
}

function putRestApi(params) {
  return new Promise((resolve, reject) => {
    ag.putRestApi(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      logger.info('API imported successfully');
      resolve(data);
    });
  });
}

function createApiStage() {
  return cf.getStackOutputs().then((cfOutputs) => {
    let restApi = cfOutputs.ApiGatewayRestApi;
    let params = {
      restApiId: restApi,
      stageName: config.ENVIRONMENT_STAGE
    };
    return params;
  }).then(createDeployment);
}

function createDeployment(params) {
  return new Promise((resolve, reject) => {
    ag.createDeployment(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      logger.info('API deployment created successfully');
      resolve(data);
    });
  });
}

function exportApi() {
  return cf.getStackOutputs().then((cfOutputs) => {
    let restApi = cfOutputs.ApiGatewayRestApi;
    let params = {
      exportType: 'swagger',
      restApiId: restApi,
      stageName: config.ENVIRONMENT_STAGE,
      accepts: 'application/json',
      parameters: {
        extensions: 'integrations'
      }
    };
    return new Promise((resolve, reject) => {
      ag.getExport(params, function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        let apiDoc = JSON.parse(data.body);
        fs.writeFileSync(path.join(__dirname, '..', 'swagger', 'BlueDeltaAPI-exported.yml'), yaml.safeDump(apiDoc));
        logger.info('Successfully exported Swagger yaml definition from AWS');
        resolve('Successfully exported Swagger');
      });
    });
  });
}

function deleteApiExport() {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, '..', 'swagger', 'BlueDeltaAPI-exported.yml'), (err) => {
      if (err) {
        reject(err);
      }
      logger.info('Deleted exported Swagger API from API Gateway');
      resolve('Deleted Swagger API export');
    });
  });
}

module.exports = {
  createApiStage,
  deleteApiExport,
  getApiInvokeUrl,
  exportApi,
  importApi
};
