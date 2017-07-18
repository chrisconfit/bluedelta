'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let buttons = rfr('buttons');
let threads = rfr('threads');
let fabrics = rfr('fabrics');
let jeans = rfr('jeans');
let users = rfr('users');
let orders = rfr('orders');
let comments = rfr('comments');
let ping = rfr('ping');

var methods = {
  '/users': {
    'GET': users.List,
    'POST': users.Create
  },
  '/users/{userId}': {
    'GET': users.Get,
    'POST': users.Update,
    'DELETE': users.Delete
  },
  '/users/{userId}/orders': {
    'GET': orders.ListByUser
  },
  '/users/{userId}/jeans': {
    'GET': jeans.List,
    'POST': jeans.Create
  },
  '/users/{userId}/jeans/{jeanId}' : {
    'GET': jeans.Get,
    'POST': jeans.Update,
    'DELETE': jeans.Delete
  },
  '/orders': {
    'GET': orders.List,
    'POST': orders.Create
  },
  '/orders/{orderId}': {
    'GET': orders.Get,
    'POST': orders.Update,
    'DELETE': orders.Delete
  },
  '/orders/{orderId}/comments': {
    'GET': comments.List,
    'POST': comments.Create
  },
  '/buttons': {
    'GET': buttons.List,
    'POST': buttons.Create
  },
  '/buttons/{buttonId}': {
    'GET': buttons.Get,
    'POST': buttons.Update,
    'DELETE': buttons.Delete
  },
  '/threads': {
    'GET': threads.List,
    'POST': threads.Create
  },
  '/threads/{threadId}': {
    'GET': threads.Get,
    'POST': threads.Update,
    'DELETE': threads.Delete
  },
  '/fabrics': {
    'GET': fabrics.List,
    'POST': fabrics.Create
  },
  '/fabrics/{fabricId}': {
    'GET': fabrics.Get,
    'POST': fabrics.Update,
    'DELETE': fabrics.Delete
  },
  '/ping': {
    'GET': ping.PingOperation
  }
};

function handler(event, context) {

  if (event.resource && event.httpMethod && methods[event.resource] && methods[event.resource][event.httpMethod]) {
    console.log("Resource: " + event.resource);
    console.log("HTTP Method: " + event.httpMethod);
    console.log("Function: " + methods[event.resource][event.httpMethod]);
    return methods[event.resource][event.httpMethod](event, context);
  }
  //
  // if (event.operation && event.operation.startsWith('com.hatboysoftware.blue-delta')) {
  //   let offset = event.operation.lastIndexOf('.') + 1;
  //   let call = event.operation.slice(offset);
  //   let module = rfr(call.slice(0, call.lastIndexOf('-')));
  //   let method = call.slice(call.lastIndexOf('-') + 1);
  //   return module[method](event, context);
  // } else {
  //   return new Promise((resolve, reject) => {
  //     reject("Incorrect namespace: " + JSON.stringify(event));
  //   });
  // }
}

module.exports = wrapper.wrapModule({
  handler
});
