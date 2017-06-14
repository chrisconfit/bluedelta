'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');
let users = rfr('users');
let ping = rfr('ping');

function handler(event, context) {

  console.log('EVENT!!!!!!', event);

  function initialNarrowingByHttp(httpMethod) {
    switch(httpMethod) {
      case 'GET':
        return (itemId) => {
          if (itemId) return 'Get';
          return 'List'
        };
      case 'POST':
        return (itemId) => {
          if (itemId) return 'Update';
          return 'Create';
        };
      case 'DELETE':
        return (itemId) => {
          return 'Delete';
        };
    }
  } // tested

  function getLastEndpointResource(endpointPath) {
    let resourceArray = endpointPath.split('/').filter(v => v.length > 1);
    if (resourceArray.length > 1) return resourceArray[resourceArray.length - 1];
    return resourceArray[0];
  } // tested

  function isACollection(resourceString) {
    return (/(buttons|fabrics|jeans|measurements|orders|ping|threads|users)/.test(resourceString));
  } // tested

  function isAnId(resourceString) {
    return !(/(buttons|fabrics|jeans|measurements|orders|ping|threads|users)/.test(resourceString));
  } // tested

  function getLastCollectionInEndpoint(endpointPath, validator) {
    let collections = endpointPath.split('/').filter(v => v.length > 1 ).filter(v => validator(v));
    if (collections.length > 1) return collections[collections.length - 1];
    return collections[0];
  } // tested


  let lastCollection = getLastCollectionInEndpoint(event.path, isACollection);
  let determineMethodByIdPresence = initialNarrowingByHttp(event.httpMethod);
  let methodToCall = determineMethodByIdPresence( isAnId( getLastEndpointResource(event.path) ) );

  
  console.log('lastCollection',lastCollection);
  console.log('methodToCall', methodToCall);
  
  return rfr(lastCollection)[methodToCall](event, context);
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
