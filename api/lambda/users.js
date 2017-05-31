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
  return UsersTable.get(event.identityId).then(
    () => {
      return UsersTable.delete(event.identityId);
    });
}

function Get(event, context) {
  return UsersTable.get(event.identityId);
}

function List(event, context) {
  console.log(event);
  //TODO(Justin): Add pagination to list results
  return UsersTable.scan();
}

function ListFollowers(event, context) {
  console.log(event);
  // TODO Add pagination and only list followers.
  return UsersTable.scan();
}

function ListFollowing(event, context) {
  console.log(event);
  // TODO Add pagination and only list followers.
  return UsersTable.scan();
}

function Update(event, context) {
  let input = JSON.parse(event.body);
  return UsersTable.get(event.identityId).then((data) => {
    input.createTime = data.createTime;
    input.identityId = event.identityId;
    return UsersTable.put(input);
  });
}

module.exports = {
  Create,
  Delete,
  Get,
  List,
  ListFollowers,
  ListFollowing,
  Update,
};
