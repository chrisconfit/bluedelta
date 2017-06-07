'use strict';
var rfr = require('rfr');
var logger = rfr('util/logger');
var config = rfr('config');
var AWS = config.AWS;
var cf = rfr('/util/cloudFormation');
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

function createFunction() {
  return cf.getStackOutputs().then((cfOutputs) => {
      assert(cfOutputs.LambdaExecutionRoleArn, 'Missing LambdaExecutionRoleArn');
      return {
        Code: {
          S3Bucket: cfOutputs.LambdaBucket,
          S3Key: config.getLambdaZipName(),
        },
        Description: config.getResourcePrefix() + 'api',
        FunctionName: config.getResourcePrefix() + 'api',
        Handler: 'app.handler',
        Role: cfOutputs.LambdaExecutionRoleArn,
        Runtime: 'nodejs4.3',
        Timeout: 10
      };
    }).then(createFunctionImpl);
}

function createCustomAuthorizerLambdaFunction() {
    return cf.getStackOutputs().then((cfOutputs) => {
        assert(cfOutputs.LambdaExecutionRoleArn, 'Missing LambdaExecutionRoleArn');
        return {
            Code: {
                S3Bucket: cfOutputs.LambdaBucket,
                S3Key: config.getLambdaZipName(),
            },
            Description: 'Custom authorizer function for API Gateway to grant admin-only permissions',
            FunctionName: config.getResourcePrefix() + 'authorizer',
            Handler: 'authorizer.Custom',
            Role: cfOutputs.LambdaExecutionRoleArn,
            Runtime: 'nodejs4.3',
            Timeout: 10
        };
    }).then(createFunctionImpl);
}

function createCognitoTriggerFunction() {
    return cf.getStackOutputs().then((cfOutputs) => {
        assert(cfOutputs.LambdaExecutionRoleArn, 'Missing LambdaExecutionRoleArn');
        return {
            Code: {
                S3Bucket: cfOutputs.LambdaBucket,
                S3Key: config.getLambdaZipName(),
            },
            Description: 'Custom function for Cognito trigger',
            FunctionName: config.getResourcePrefix() + 'cognito-trigger',
            Handler: 'cognito_trigger.handler',
            Role: cfOutputs.LambdaExecutionRoleArn,
            Runtime: 'nodejs4.3',
            Timeout: 10
        };
    }).then(createFunctionImpl);
}

function createCognitoSyncTriggerFunction() {
  return cf.getStackOutputs().then((cfOutputs) => {
    assert(cfOutputs.LambdaExecutionRoleArn, 'Missing LambdaExecutionRoleArn');
    return {
      Code: {
        S3Bucket: cfOutputs.LambdaBucket,
        S3Key: config.getLambdaZipName(),
      },
      Description: 'Custom function for Cognito Sync trigger',
      FunctionName: config.getResourcePrefix() + 'cognito',
      Handler: 'cognito_sync.handler',
      Role: cfOutputs.LambdaExecutionRoleArn,
      Runtime: 'nodejs4.3',
      Timeout: 10
    };
  }).then(createFunctionImpl);
}

function createFunctionImpl(params) {
  return new Promise((resolve, reject) => {
    let lambda = new AWS.Lambda();
    lambda.createFunction(params, function(err, data) {
      if (err) {
        if (err.code === 'ResourceConflictException') {
          resolve(updateFunction(params));
        } else {
          reject(err);
          return;
        }
      }
      logger.info('Created/updated Lambda function', params.FunctionName);
      resolve(data);
    });
  });
}

function updateFunction(params) {
  return updateFunctionConfiguration({
    Description: params.Description,
    FunctionName: params.FunctionName,
    Handler: params.Handler,
    Role: params.Role,
    Runtime: params.Runtime,
    Timeout: params.Timeout
  }).then(() => {
    return updateFunctionCode({
      FunctionName: params.FunctionName,
      S3Bucket: params.Code.S3Bucket,
      S3Key: params.Code.S3Key
    });
  });
}

function updateFunctionConfiguration(params) {
  return new Promise((resolve, reject) => {
    let lambda = new AWS.Lambda();
    lambda.updateFunctionConfiguration(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function updateFunctionCode(params) {
  return new Promise((resolve, reject) => {
    let lambda = new AWS.Lambda();
    lambda.updateFunctionCode(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function addCognitoSyncPermission(config) {
  return new Promise((resolve, reject) => {
    let params = {
      Action: 'lambda:InvokeFunction',
      FunctionName: config.FunctionName,
      Principal: 'cognito-sync.amazonaws.com',
      StatementId: 'cognito-sync-invoke-permissions',
    };
    let lambda = new AWS.Lambda();
    lambda.addPermission(params, (err, data) => {
      if (err) {
        if (err.code === 'ResourceConflictException') {
          resolve();
        }

        reject(err);
        return;
      }

      logger.info('Permissions updated', config.FunctionName);
      resolve(data);
    });
  });
}

function addCognitoTriggerPermission(config) {
    return new Promise((resolve, reject) => {
        let params = {
            Action: 'lambda:InvokeFunction',
            FunctionName: config.FunctionName,
            Principal: 'cognito-idp.amazonaws.com',
            StatementId: 'cognito-idp-invoke-permissions',
        };
        let lambda = new AWS.Lambda();
        lambda.addPermission(params, (err, data) => {
            if (err) {
                if (err.code === 'ResourceConflictException') {
                    resolve();
                }

                reject(err);
                return;
            }

            logger.info('Permissions updated', config.FunctionName);
            resolve(data);
        });
    });
}

function addPermission(config) {
  return new Promise((resolve, reject) => {
    let params = {
      Action: 'lambda:InvokeFunction',
      FunctionName: config.FunctionName,
      Principal: 'apigateway.amazonaws.com',
      StatementId: 'apigateway-invoke-permissions',
      // TODO(Justin): Add more optional stuff
      // EventSourceToken: 'STRING_VALUE',
      // Qualifier: 'STRING_VALUE',
      // SourceAccount: 'STRING_VALUE',
      // SourceArn: `arn:aws:execute-api:us-west-2:IAMAccountNumber://POST/event`
    };
    let lambda = new AWS.Lambda();
    lambda.addPermission(params, (err, data) => {
      if (err) {
        if (err.code === 'ResourceConflictException') {
          resolve();
        }

        reject(err);
        return;
      }

      logger.info('Permissions updated', config.FunctionName);
      resolve(data);
    });
  });
}

function createFunctionsFromSwagger() {
  var api = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'swagger', 'BlueDeltaAPI.yml')).toString());
  var promises = [];
  promises.push(createFunction());
  return Promise.all(promises).then((result) => {
    var permPromises = [];
    result.forEach(result => {
      permPromises.push(addPermission(result));
    });
    return Promise.all(permPromises);
  });
}

function createCognitoTriggerFunctionAndPermission() {
    return new Promise((resolve, reject) => {
        createCognitoTriggerFunction()
            .then((data) => {
                addCognitoTriggerPermission(data).then(() => {
                    resolve(data.FunctionName);
                });
            })
            .catch((err) => {
                logger.error(err);
                reject(err);
            });
    });
}

function createCognitoSyncTriggerFunctionAndPermission() {
  return new Promise((resolve, reject) => {
    createCognitoSyncTriggerFunction()
      .then((data) => {
        addCognitoSyncPermission(data).then(() => {
          resolve(data.FunctionName);
        });
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
}

function createCustomAuthorizerFunction() {
  return new Promise((resolve, reject) => {
    createCustomAuthorizerLambdaFunction().then((data) => {
      // Add permissions for API Gateway to call Lambda function
      addPermission(data).then(() => {
        resolve(data.FunctionName);
      });
    }).catch((err) => {
      logger.error(err);
      reject(err);
    })
  });
}

var lambdaFunctions = [];

function listFunctions() {
  return new Promise((resolve, reject) => {
    lambdaFunctions = [];
    listFunctionsImpl(null, config.getResourcePrefix(), function (err) {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(lambdaFunctions);
    });
  });
}

function listFunctionsImpl(marker, stringPattern, callback) {
  let lambda = new AWS.Lambda();
  let params = {
    Marker: marker,
    MaxItems: 50
  };
  lambda.listFunctions(params, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    for (let i = 0; i < data.Functions.length; i++) {
      if (data.Functions[i].FunctionName.includes(stringPattern)) {
        lambdaFunctions.push(data.Functions[i].FunctionName);
      }
    }
    if (data.NextMarker !== null) {
      listFunctionsImpl(data.NextMarker, stringPattern, callback);
    } else {
      // All functions have been retrieved
      callback(null);
    }
  });
}

function deleteFunction(functionName) {
  return new Promise((resolve, reject) => {
    let lambda = new AWS.Lambda();
    let params = {
      FunctionName: functionName,
    };
    lambda.deleteFunction(params, function(err, data) {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

function deleteFunctions() {
  return new Promise((resolve, reject) => {
    listFunctions().then((functionsArray) => {
      logger.info('Lambda functions for deletion', functionsArray);
      let deleteFunctionPromises = [];
      for (let i = 0; i < functionsArray.length; i++) {
        deleteFunctionPromises.push(deleteFunction(functionsArray[i]));
      }
      Promise.all(deleteFunctionPromises).then((data) => {
        logger.info('Deleted Lambda functions successfully');
        resolve(data);
      }).catch((err) => {
        logger.error(err);
        reject(err);
      });
    });
  });
}

module.exports = {
  createFunctionsFromSwagger,
  createCustomAuthorizerFunction,
  createCognitoSyncTriggerFunctionAndPermission,
  createCognitoTriggerFunctionAndPermission,
  deleteFunctions
};
