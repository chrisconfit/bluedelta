'use strict';
var rfr = require('rfr');
var app = rfr('lambda/app');
var chai = require('chai');
var expect = chai.expect;
/* jshint -W024 */
/* jshint expr:true */
describe('Create Get Update Delete', function() {

  before((done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.users-Create',
        identityId: 'identityId',
        body: JSON.stringify({
          identityId: 'identityId',
          properties: {
            name: 'User1',
          },
        }),
        params: {
        },
      }, {}, (err, out) => {
        let data = JSON.parse(out.body);
        expect(err).to.not.exist;
        expect(data.identityId).to.exist;
        expect(data.identityId).to.be.eql('identityId');
        this.identityId = data.identityId;
        app.handler({
          operation: 'com.hatboysoftware.blue-delta.pitches-Create',
          identityId: this.identityId,
          body: JSON.stringify({
            userId: this.identityId,
            properties: {
              title: 'Pitch Title',
              description: 'Pitch Description',
            },
          }),
        }, {}, (err, out) => {
          expect(err).to.not.exist;
          let data = JSON.parse(out.body);
          expect(data.createTime).to.exist;
          expect(data.userId).to.be.eql(this.identityId);
          expect(data.properties).to.exist;
          expect(data.properties.title).to.exist;
          expect(data.properties.title).to.be.eql('Pitch Title');
          expect(data.properties.description).to.exist;
          expect(data.properties.description).to.be.eql('Pitch Description');
          expect(data.pitchId).to.exist;
          this.pitchId = data.pitchId;
          done();
        });
      }
    );
  });
  it('Get and Update value', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.pitches-Get',
        identityId: this.identityId,
        params: {
          pitchId: this.pitchId,
        },
      }, {}, (err, out) => {
        let data = JSON.parse(out.body);
        expect(err).to.not.exist;
        expect(data.pitchId).to.exist;
        expect(data.pitchId).to.be.eql(this.pitchId);
        data.properties.title = 'New Pitch Title';
        app.handler({
          operation: 'com.hatboysoftware.blue-delta.pitches-Update',
          identityId: this.id,
          body: JSON.stringify(data),
          params: {
            pitchId: this.pitchId,
          }
        }, {}, (err, out) => {
          expect(err).to.not.exist;
          let data = JSON.parse(out.body);
          expect(data.updateTime).to.exist;
          expect(data.pitchId).to.be.eql(this.pitchId);
          done();
        });
      }
    );
  });
  after((done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.pitches-Delete',
        identityId: 'identityId',
        params: {
          pitchId: this.pitchId,
        },
      }, {}, (err, data) => {
        console.log(JSON.stringify(err, null, 4));
        expect(err).to.not.exist;
        expect(JSON.parse(data.body)).to.be.eql({});
        done();
      }
    );
  });
});

describe('Pitches Not Found', function() {
  it('Get 404', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.pitches-Get',
        identityId: 'identityId',
        params: {
          pitchId: 'someId',
        },
      },
      {
        // Empty context object for testing purposes
      },
      (err, out) => {
        console.log(out);
        expect(err).to.not.exist;
        expect(out.statusCode).to.be.eql(404);
        done();
      });
  });

  it('Update 404', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.pitches-Update',
        identityId: 'identityId',
        body: JSON.stringify({
          pitchId: 'someId',
          userId: 'someId',
          properties: {
          },
        }),
        params: {
          pitchId: 'someId',
        },
      },
      {
        // Empty context object for testing purposes
      },
      (err, out) => {
        console.log(out);
        expect(err).to.not.exist;
        expect(out.statusCode).to.be.eql(404);
        done();
      });
  });

  it('Delete 404', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.pitches-Delete',
        identityId: 'identityId',
        params: {
          pitchId: 'someId',
        },
      },
      {
        // Empty context object for testing purposes
      },
      (err, out) => {
        console.log(out);
        expect(err).to.not.exist;
        expect(out.statusCode).to.be.eql(404);
        done();
      });
  });
});
