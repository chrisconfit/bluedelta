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
          app.handler({
            operation: 'com.hatboysoftware.blue-delta.comments-Create',
            identityId: this.identityId,
            body: JSON.stringify({
              userId: this.identityId,
              pitchId: this.pitchId,
              message: 'Comment message',
            }),
          }, {}, (err, out) => {
            let data = JSON.parse(out.body);
            expect(data.createTime).to.exist;
            expect(data.userId).to.exist;
            expect(data.userId).to.be.eql(this.identityId);
            expect(data.pitchId).to.exist;
            expect(data.pitchId).to.be.eql(this.pitchId);
            expect(data.message).to.exist;
            expect(data.message).to.be.eql('Comment message');
            expect(data.commentId).to.exist;
            this.commentId = data.commentId;
            done();
          });
        });
      }
    );
  });
  it('Get and Update value', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.comments-Get',
        identityId: this.identityId,
        params: {
          pitchId: this.pitchId,
          commentId: this.commentId,
        },
      }, {}, (err, out) => {
        let data = JSON.parse(out.body);
        expect(err).to.not.exist;
        expect(data.commentId).to.exist;
        expect(data.commentId).to.be.eql(this.commentId);
        data.message = 'New Comment';
        app.handler({
          operation: 'com.hatboysoftware.blue-delta.comments-Update',
          identityId: this.id,
          body: JSON.stringify(data),
          params: {
            pitchId: this.pitchId,
            commentId: this.commentId,
          }
        }, {}, (err, out) => {
          expect(err).to.not.exist;
          let data = JSON.parse(out.body);
          expect(data.updateTime).to.exist;
          expect(data.commentId).to.be.eql(this.commentId);
          done();
        });
      }
    );
  });
  after((done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.comments-Delete',
        identityId: 'identityId',
        params: {
          pitchId: this.pitchId,
          commentId: this.commentId,
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

describe('Comments Not Found', function() {
  it('Get 404', (done) => {
    app.handler(
      {
        operation: 'com.hatboysoftware.blue-delta.comments-Get',
        identityId: 'identityId',
        params: {
          pitchId: 'someId',
          commentId: 'someId',
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
        operation: 'com.hatboysoftware.blue-delta.comments-Update',
        identityId: 'identityId',
        body: JSON.stringify({
          commentId: 'commentId',
          pitchId: 'someId',
          userId: 'someId',
          message: 'Message',
        }),
        params: {
          commentId: 'someId',
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
        operation: 'com.hatboysoftware.blue-delta.comments-Delete',
        identityId: 'identityId',
        params: {
          pitchId: 'someId',
          commentId: 'someId',
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
