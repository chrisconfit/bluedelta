'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');

function List(event, context) {
  return new Promise((resolve, reject) => {
    resolve({ response : "PONG" });
  });
}

module.exports = {
  List,
};
