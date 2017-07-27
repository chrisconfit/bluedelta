'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let ButtonsTable = new data.ButtonsTable();


function Create(event, context) {

    return ButtonsTable.put(JSON.parse(event.body));
}

function Delete(event, context){
    // If does not exists will give 404.
    return ButtonsTable.get(event.pathParameters.buttonId).then(
        () => {
            return ButtonsTable.delete(event.pathParameters.buttonId);
        });
}

function Get(event, context) {
    return ButtonsTable.get(event.pathParameters.buttonId);
}

function List(event, context) {
    let limit = 25;
    let next = null;
    if (event.pathParameters) {
        limit = event.pathParameters.page_size || 25;
        next = event.pathParameters.next;
    }
    return ButtonsTable.scan(limit, next);
}

function Update(event, context) {
    let input = JSON.parse(event.body);
    return ButtonsTable.get(event.pathParameters.buttonId).then((data) => {
        input.createTime = data.createTime;
        input.buttonId = event.pathParameters.buttonId;
        return ButtonsTable.put(input);
    })
}

module.exports = {
    Create,
    Delete,
    Get,
    List,
    Update
};
