'use strict';
let rfr = require('rfr');
let wrapper = rfr('wrapper');
let users = rfr('users');
let data = rfr('data');
let UsersTable = new data.UsersTable();

function handler(event, context) {
  return users.Get(event)
    .then((data) => {
      for (var property in event.datasetRecords) {
        if (event.datasetRecords[property].op === 'replace') {
          data.properties[property] = event.datasetRecords[property].newValue;
        }
      }

      return UsersTable.put(data);
    })
    .catch((err) => {
      if (err.statusCode == 404) {
        let input = {
          identityId: event.identityId,
          properties: {},
        };

        for (var newProperty in event.datasetRecords) {
          if (event.datasetRecords[newProperty].newValue) {
            input.properties[newProperty] = event.datasetRecords[newProperty].newValue;
          }
        }

        return UsersTable.put(input);
      } else {
        throw err;
      }
    });
}

module.exports = wrapper.wrapCognitoModule({
  handler,
});
