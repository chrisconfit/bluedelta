'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let FabricsTable = new data.FabricsTable();


function Create(event, context) {

    return FabricsTable.put(JSON.parse(event.body));
}

function Delete(event, context){
    // If does not exists will give 404.
    return FabricsTable.get(event.pathParameters.fabricId).then(
        () => {
            return FabricsTable.delete(event.pathParameters.fabricId);
        });
}

function Get(event, context) {
    return FabricsTable.get(event.pathParameters.fabricId);
}

function List(event, context) {
    let limit = 25;
    let next = null;
    if (event.queryStringParameters) {
        limit = event.queryStringParameters.page_size || 25;
        next = event.queryStringParameters.next;
    }
    return FabricsTable.scan(limit, next);
}

function Update(event, context) {
    let input = JSON.parse(event.body);
    return FabricsTable.get(event.pathParameters.fabricId).then((data) => {
        input.createTime = data.createTime;
        input.fabricId = event.pathParameters.fabricId;
        return FabricsTable.put(input);
    })
}

module.exports = {
    Create,
    Delete,
    Get,
    List,
    Update
};
