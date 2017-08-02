'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let UsersTable = new data.UsersTable();


function Create(event, context) {
  return UsersTable.put(JSON.parse(event.body));
}

function Delete(event, context){
  // If does not exists will give 404.
  return UsersTable.get(event.pathParameters.userId).then(
    () => {
      return UsersTable.delete(event.pathParameters.userId);
    });
}

function Get(event, context) {
  return UsersTable.get(event.pathParameters.userId);
}

function List(event, context) {
    let limit = 25;
    let next = null;
    if (event.queryStringParameters) {
        limit = event.queryStringParameters.page_size || 25;
        next = event.queryStringParameters.next;
    }
    return UsersTable.scan(limit, next);
}

function Update(event, context) {
  let input = JSON.parse(event.body);
  return UsersTable.get(event.pathParameters.userId).then((data) => {
    input.createTime = data.createTime;
    input.identityId = event.pathParameters.userId;
    return UsersTable.put(input);
  });
}

module.exports = {
  Create,
  Delete,
  Get,
  List,
  Update,
};
