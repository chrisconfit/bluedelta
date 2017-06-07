'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let users = rfr('users');
let ping = rfr('ping');

function handler(event, context) {

  function initialNarrowing(httpMethod) {
    switch(httpMethod) {
      case 'GET':
        console.log('GET RAN');
        return (collection, itemId) => {
          console.log(collection, itemId);
          if (itemId) return 'Get';
          return 'List'
        };
      case 'POST':
        console.log('POST RAN');
        return (collection, itemId) => {
          console.log(collection, itemId);
          return '';
        };
      case 'DELETE':
        console.log('DELETE RAN');
        return (collection, itemId) => {
          console.log(collection, itemId);
          return '';
        };
    }
  }

  let determine = initialNarrowing(event.httpMethod);

  let methodToCall = determine('collection', null);
  
  return rfr('buttons')[methodToCall](event, context);
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
