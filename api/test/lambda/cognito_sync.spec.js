// 'use strict';
// var rfr = require('rfr');
// var app = rfr('lambda/app');
// var cognito_sync = rfr('lambda/cognito_sync');
// var chai = require('chai');
// var expect = chai.expect;
// /* jshint -W024 */
// /* jshint expr:true */
//
// describe('Create Update via Cognito Sync', function() {
//
//   before((done) => {
//     cognito_sync.handler(
//       {
//         version: 2,
//         eventType: "SyncTrigger",
//         region: "us-east-1",
//         identityPoolId: "identityPoolId",
//         identityId: "identityId",
//         datasetName: "datasetName",
//         datasetRecords: {
//           name: {
//             newValue: "User1",
//             op: "replace"
//           },
//         },
//       },
//       {
//         // Empty context object for testing purposes
//       },
//       (err, out) => {
//         expect(err).to.not.exist;
//         expect(out.identityId).to.exist;
//         expect(out.identityId).to.be.eql('identityId');
//         this.identityId = out.identityId;
//         done();
//       }
//     );
//   });
//
//   it('Gets and Updates via Cognito Sync', (done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Get',
//         identityId: 'identityId',
//         params: {
//           identityId: 'identityId',
//         },
//       }, {}, (err, out) => {
//         let data = JSON.parse(out.body);
//         expect(err).to.not.exist;
//         expect(data.identityId).to.be.eql(this.identityId);
//         expect(data.properties.name).to.be.eql('User1');
//         done();
//       }
//     );
//   });
//   after((done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Delete',
//         identityId: 'identityId',
//         body: JSON.stringify({
//           identityId: 'identityId',
//           properties: {
//           },
//         }),
//         params: {
//           identityId: 'identityId',
//         },
//       },
//       {
//         // Empty context object for testing
//       },
//       (err, data) => {
//         console.log(JSON.stringify(err, null, 4));
//         expect(err).to.not.exist;
//         expect(JSON.parse(data.body)).to.be.eql({});
//         done();
//       }
//     );
//   });
// });
