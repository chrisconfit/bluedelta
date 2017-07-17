'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let UsersTable = new data.UsersTable();
let LambdaError = require('./errors');


function Create(event, context) {
    let input = JSON.parse(event.body);
    return UsersTable.get(event.pathParameters.userId).then(
        (data) => {
            if (!data.nextJeanId) {
                data.nextJeanId = 1
            }

            input.jeanId = data.nextJeanId;
            data.nextJeanId += 1;
            if (data.jeans) {
                data.jeans.push(input);
            } else {
                data.jeans = [input];
            }

            return UsersTable.put(data);
        }
    );
}

function Delete(event, context){
    return UsersTable.get(event.pathParameters.userId).then(
        (data) => {
            if (data.jeans) {
                data.jeans = data.jeans.filter( (jean) => { return !(jean.jeanId == parseInt(event.pathParameters.jeanId)) });
                return UsersTable.put(data);
            }
        }
    );
}

function Get(event, context) {
    return UsersTable.get(event.pathParameters.userId).then(
        (data) => {
            console.log(data);
            return new Promise((resolve, reject) => {
                var jean = data.jeans.find( (jean) => { return jean.jeanId == parseInt(event.pathParameters.jeanId) });
                if (jean) {
                    resolve(jean)
                } else {
                    reject(LambdaError.notFound(JSON.stringify(event.pathParameters.jeanId)));
                }
            });
        }
    );
}

function List(event, context) {
    return UsersTable.get(event.pathParameters.userId).then(
        (data) => {
            return new Promise((resolve, reject) => {
                resolve(data.jeans);
            });
        }
    );
}

function Update(event, context) {
    let input = JSON.parse(event.body);
    return UsersTable.get(event.pathParameters.userId).then(
        (data) => {
            input.id = event.pathParameters.jeanId;
            if (data.jeans) {
                data.jeans = data.jeans.filter( (jean) => { return !(jean.jeanId === parseInt(event.pathParameters.jeanId)) } );
                data.jeans.push(input);
            }

            return UsersTable.put(data);
        }
    );
}

module.exports = {
    Create,
    Delete,
    Get,
    List,
    Update,
};
