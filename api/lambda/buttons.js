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
    console.log('buttons-List');
    console.log(event);
    //TODO(Justin): Add pagination to list results
    return ButtonsTable.scan();
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
