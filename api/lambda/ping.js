'use strict';
let rfr = require('rfr');
let data = rfr('data');
let wrapper = rfr('wrapper');

function PingOperation(event, context) {
  return new Promise((resolve, reject) => {
    resolve({ response : "PONG" });
  });
}

module.exports = {
  PingOperation,
};
