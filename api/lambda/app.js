'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let users = rfr('users');
let ping = rfr('ping');

function handler(event, context) {
  if (event.operation && event.operation.startsWith('com.hatboysoftware.blue-delta')) {
    let offset = event.operation.lastIndexOf('.') + 1;
    let call = event.operation.slice(offset);
    let module = rfr(call.slice(0, call.lastIndexOf('-')));
    let method = call.slice(call.lastIndexOf('-') + 1);
    return module[method](event, context);
  } else {
    return new Promise((resolve, reject) => {
      reject("Incorrect namespace");
    });
  }
}

module.exports = wrapper.wrapModule({
  handler
});
