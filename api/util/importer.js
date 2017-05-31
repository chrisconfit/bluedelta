'use strict';
var rfr = require('rfr');
var logger = rfr('util/logger');
var buttons = rfr('lambda/buttons');
var threads = rfr('lambda/threads');
var fabrics = rfr('lambda/fabrics');
var cognito = rfr('util/cognito');

/*
 More information about the UserGroups and the precedence
 http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-user-groups.html#assigning-precedence-values-to-groups
 */

var SampleGroups = [
  {
    name: 'adminGroup',
    description: 'Cognito user group for administrators',
    precedence: 0,
    roleArn: 'cognitoAuthAdminRoleArn'
  },
  {
    name: 'clientGroup',
    description: 'Cognito user group for blue-delta users',
    precedence: 1,
    roleArn: 'cognitoAuthStandardRoleArn'
  },
];


var SampleUsers = [
  {
    username: 'admin1',
    email: 'admin@example.com',
    phone: null,
    givenName: 'Admin',
    familyName: 'User',
    password: 'Test123!'

  },
  {
    username: 'user1',
    email: 'user1@example.com',
    phone: null,
    givenName: 'Sample',
    familyName: 'User',
    password: 'Test123!'
  }
];

class SampleData {

  generateSampleData() {
    return Promise.all([
      // this.generateSampleUser('user1', 'user1@example.com', '16628018533', 'Sample', 'User', 'Test123!')
      //   .then(user => {
      //     this.getSampleUserIdentity(user)
      //       .then(userId => {
      //         this.generateSamplePitch(userId, 'Test Pitch', 'Test Pitch Description')
      //           .then(pitchId => {
      //             this.generateSampleComment(userId, pitchId, 'Test Comment');
      //           });
      //       });
      //   })
    ]);
  }
  //
  // generateSampleUser(username, email, phone, first_name, last_name, password) {
  //   return new Promise((resolve, reject) => {
  //     var user = {
  //       username: username,
  //       email: email,
  //       phone_number: phone,
  //       givenName: first_name,
  //       familyName: last_name,
  //       password: password
  //     };
  //
  //     cognito.adminCreateUser(user)
  //       .then((data) => {
  //         resolve(user);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }
  //
  // getSampleUserIdentity(user) {
  //   return new Promise((resolve, err) => {
  //     cognito.getIdentityPoolUserId(user).then(
  //       (data) => {
  //         resolve(data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }
  //
  // generateSamplePitch(userId, title, description) {
  //   return new Promise((resolve, reject) => {
  //     pitches.Create(
  //       {
  //         body: JSON.stringify({
  //           userId: userId,
  //           pitch_properties: {
  //             items: [
  //               { key: 'Title', value: title },
  //               { key: 'Description', value: description }
  //             ]
  //           }
  //         }),
  //       },
  //       {/* Empty context object */},
  //       (err, out) => {
  //         if (err !== null) {
  //           reject(err);
  //         } else {
  //           let data = JSON.parse(out.body);
  //           resolve(data.pitchId);
  //         }
  //       }
  //     );
  //   });
  // }
  //
  // generateSampleComment(userId, pitchId, message) {
  //   return new Promise((resolve, reject) => {
  //     comments.Create(
  //       {
  //         body: JSON.stringify({
  //           userId: userId,
  //           pitchId: pitchId,
  //           message: message
  //         })
  //       },
  //       {/* Empty context object */},
  //       (err, out) => {
  //         if (err != null) {
  //           reject(err);
  //         } else {
  //           let data = JSON.parse(out.body);
  //           resolve(data.commentId);
  //         }
  //       }
  //     )
  //   })
  // }

  static createPromiseToCreateUser(user) {
    let promise = new Promise((resolve, reject) => {
      cognito.adminCreateUser(user)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  static generateSampleUsers() {
    let promises = [];
    for (let user of SampleUsers) {
      // create a Promise for each user creation task
      let promise = SampleData.createPromiseToCreateUser(user);
      promises.push(promise);
    }
    // now, run all those Promises in parallel
    return Promise.all(promises);
  }

  //TODO: Update following method to accept a particular username or user details object and lookup their corresponding user identity pools Id
  static getSampleUser() {
    return new Promise((resolve) => {
      let user = SampleUsers[1];
      cognito.getIdentityPoolUserId(user).then((data) => {
        //logger.info(data);
        resolve(data);
      });
    });
  }

  static createPromiseToCreateGroup(group) {
    let promise = new Promise((resolve, reject) => {
      cognito.adminCreateGroup(group)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  static generateSampleUserGroups() {
    let promises = [];
    for (let group of SampleGroups) {
      let promise = SampleData.createPromiseToCreateGroup(group);
      promises.push(promise);
    }
    return Promise.all(promises);
  }


  static createUserAssignmentToGroupPromise(user, group) {
    let promise = new Promise((resolve, reject) => {
      cognito.adminAssignUserToGroup(user, group)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }


  static assignUsersToGroups() {
    let promises = [];
    for (let user of SampleUsers) {
      let group = null;

      if (user.username === "admin1") {
        group = SampleGroups[0];
      } else {
        group = SampleGroups[1];
      }
      let promise = SampleData.createUserAssignmentToGroupPromise(user, group);
      promises.push(promise);
    }
    logger.info(promises.length);
    return Promise.all(promises);


  }


} // end class

module
  .exports = {
  SampleData
};
