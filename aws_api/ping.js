import uuid from 'uuid';
import AWS from 'aws-sdk';

AWS.config.update({region:'us-east-1'});

export function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };


  // Return status code 200 and the newly created item
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({ response: "PONG" }),
  }

  callback(null, response);
};
