'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let OrdersTable = new data.OrdersTable();


function Create(event, context) {
    return OrdersTable.put(JSON.parse(event.body));
}

function Delete(event, context){
    // If does not exists will give 404.
    return OrdersTable.get(event.pathParameters.orderId).then(
        () => {
            return OrdersTable.delete(event.pathParameters.orderId);
        });
}

function Get(event, context) {
    return OrdersTable.get(event.pathParameters.orderId);
}

function List(event, context) {
    console.log(event);
    //TODO(Justin): Add pagination to list results
    return OrdersTable.scan();
}

function ListByUser(event, context) {
    console.log(event);
    return OrdersTable.scan();
}

function Update(event, context) {
    let input = JSON.parse(event.body);
    return OrdersTable.get(event.pathParameters.orderId).then((data) => {
        input.createTime = data.createTime;
        input.orderId = event.orderId;
        return OrdersTable.put(input);
    });
}

module.exports = {
    Create,
    Delete,
    Get,
    List,
    ListByUser,
    Update,
};
