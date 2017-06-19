'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let ThreadsTable = new data.ThreadsTable();


function Create(event, context) {

    return ThreadsTable.put(JSON.parse(event.body));
}

function Delete(event, context){
    // If does not exists will give 404.
    return ThreadsTable.get(event.pathParameters.threadId).then(
        () => {
            return ThreadsTable.delete(event.pathParameters.threadId);
        });
}

function Get(event, context) {
    return ThreadsTable.get(event.pathParameters.threadId);
}

function List(event, context) {
    console.log(event);
    //TODO(Justin): Add pagination to list results
    return ThreadsTable.scan();
}

function Update(event, context) {
    let input = JSON.parse(event.body);
    return ThreadsTable.get(event.pathParameters.threadId).then((data) => {
        input.createTime = data.createTime;
        input.threadId = event.pathParameters.threadId;
        return ThreadsTable.put(input);
    })
}

module.exports = {
    Create,
    Delete,
    Get,
    List,
    Update
};
