'use strict';
let rfr = require('rfr');
let LambdaError = rfr('errors');

/**
 * Wrap a module.exports clause to handle common Lambda handler for statusCode, errors, and body.
 * TODO: Add validation based on the swagger method.
 */


function wrapHeaders(res) {
  if (typeof res !== 'object') {
    console.error('Response is not an object', res);
    return res;
  }
  res.headers = {
    'Access-Control-Allow-Origin': '*'
  };
  return res;
}

function wrapFunction(func) {
  return (event, context, callback) => {
    try {
      func(event, context).then((data) => {
        callback(null, wrapHeaders({
          statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data),
        }));
      }).catch((lambdaError) => {
        if (lambdaError instanceof LambdaError) {
          callback(null, wrapHeaders(lambdaError.toLambda()));
        } else {
          // An unexpected error occurred, log the error, dont send to user.
          console.error('Unexpected error', lambdaError);
          callback(null, wrapHeaders({
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              message: 'An internal error occurred',
              type: 'internalError',
            }),
          }));
        }
      });
    } catch (e) {
      console.error('Uncaught exception', e, e.stack);
      callback(null, wrapHeaders({
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'An internal error occurred',
          type: 'internalError',
        })
      }));
    }
  };
}

function wrapCognitoFunction(func) {
  return (event, context, callback) => {
    try {
      var promise = func(event, context);
      if (promise) {
        promise.then((data) => {
          callback(null, event);
        }).catch((lambdaError) => {
          callback(lambdaError, event);
        });
      } else {
        console.log("No promise to process - assuming OK?");
      }
    } catch (e) {
      callback(e, event);
    }
  };
}

function wrapModule(mod) {
  let out = {};
  for (let key in mod) {
    out[key] = wrapFunction(mod[key]);
  }
  return out;
}

function wrapCognitoModule(mod) {
  let out = {};
  for (let key in mod) {
    out[key] = wrapCognitoFunction(mod[key]);
  }

  return out;
}

module.exports = {
  wrapModule,
  wrapCognitoModule,
};
