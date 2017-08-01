'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let OrdersTable = new data.OrdersTable();


function Create(event, context) {
    let input = JSON.parse(event.body);
    return OrdersTable.get(event.pathParameters.orderId).then(
        (data) => {
            input.timestamp = new Date().toISOString();
            if (data.timeline) {
                data.timeline.push(input);
            } else {
                data.timeline = [input];
            }

            return OrdersTable.put(data);
        }
    );
}

function List(event, context) {
    return OrdersTable.get(event.pathParameters.orderId).then(
        (data) => {
            return new Promise((resolve, reject) => {
                resolve(data.timeline);
            });
        }
    );
}

module.exports = {
    Create,
    List,
};
