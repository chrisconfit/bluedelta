// 'use strict';
// var rfr = require('rfr');
// var app = rfr('lambda/app');
// var chai = require('chai');
// var expect = chai.expect;
// /* jshint -W024 */
// /* jshint expr:true */
// describe('Create Get Update Delete', function() {
//
//   before((done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Create',
//         identityId: 'identityId',
//         body: JSON.stringify({
//           identityId: 'identityId',
//           properties: {
//             name: 'User1',
//           },
//         }),
//         params: {
//         },
//       },
//       {
//       // Empty context object for testing purposes
//       },
//       // Callback anonymous function for Lambda Node 4.3 runtime
//       (err, out) => {
//         let data = JSON.parse(out.body);
//         expect(err).to.not.exist;
//         expect(data.identityId).to.exist;
//         expect(data.identityId).to.be.eql('identityId');
//         this.identityId = data.identityId;
//         done();
//       }
//     );
//   });
//   it('Get and Update value', (done) => {
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
//         app.handler({
//           operation: 'com.hatboysoftware.blue-delta.users-Update',
//           identityId: 'identityId',
//           body: JSON.stringify({
//             identityId: 'identityId',
//             properties: {
//               name: 'User1-Renamed',
//             }
//           }),
//           params: {
//             identityId: 'identityId',
//           }
//         }, {}, (err, out) => {
//           expect(err).to.not.exist;
//           let data = JSON.parse(out.body);
//           expect(data.updateTime).to.exist;
//           expect(data.identityId).to.be.eql('identityId');
//           done();
//         });
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
//        // Empty context object for testing
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
//
// describe('Users Not Found', function() {
//   it('Get 404', (done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Get',
//         identityId: 'identityId',
//         params: {
//           identityId: 'someId',
//         },
//       },
//       {
//         // Empty context object for testing purposes
//       },
//       (err, out) => {
//         console.log(out);
//         expect(err).to.not.exist;
//         expect(out.statusCode).to.be.eql(404);
//         done();
//       });
//   });
//
//   it('Update 404', (done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Update',
//         identityId: 'identityId',
//         body: JSON.stringify({
//           identityId: 'someId',
//           properties: {
//           },
//         }),
//         params: {
//           identityId: 'someId',
//         },
//       },
//       {
//         // Empty context object for testing purposes
//       },
//       (err, out) => {
//         console.log(out);
//         expect(err).to.not.exist;
//         expect(out.statusCode).to.be.eql(404);
//         done();
//       });
//   });
//
//   it('Delete 404', (done) => {
//     app.handler(
//       {
//         operation: 'com.hatboysoftware.blue-delta.users-Delete',
//         identityId: 'identityId',
//         params: {
//           identityId: 'someId',
//         },
//       },
//       {
//         // Empty context object for testing purposes
//       },
//       (err, out) => {
//         console.log(out);
//         expect(err).to.not.exist;
//         expect(out.statusCode).to.be.eql(404);
//         done();
//       });
//   });
// });
