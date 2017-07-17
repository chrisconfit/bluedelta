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
  console.log(event);
  //TODO(Justin): Add pagination to list results
  return UsersTable.scan();
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
