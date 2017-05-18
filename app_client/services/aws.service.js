(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {
    
    
    getUserPool = function() {
      var userPoolInfo = { 
          UserPoolId : 'us-east-1_q2Y6U8uuY',
          ClientId : '224kjog47ojnt9ov773erj7qn9'
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(userPoolInfo);
      return userPool;
    }

    getAuthenticationDetails = function(username, password) {
      var authenticationData = {
        Username: username,
        Password: password
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      return authenticationDetails;
    }    

    fetchCognitoUser = function(username) {
      var userPoolInfo = { 
          UserPoolId : 'us-east-1_q2Y6U8uuY',
          ClientId : '224kjog47ojnt9ov773erj7qn9'
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(userPoolInfo);
      var userData = {
        Username : username,
        Pool : userPool
      };
      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      return cognitoUser;
    }

    getUserFromLocalStorage = function() {
      var data = { UserPoolId : 'us-east-1_Iqc12345', ClientId : '12345du353sm7khjj1q' };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
          cognitoUser.getSession(function(err, session) {
              if (err) {
                  alert(err);
                  return;
              }
              console.log('session validity: ' + session.isValid());
          });
      }
    }

    deleteCognitoUser = function() {
      // grab from local, if they're not in local they shouldn't be able to delete
      var data = { UserPoolId : 'us-east-1_Iqc12345', ClientId : '12345du353sm7khjj1q' };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();
      // now that we have user from local storage, delete him
      cognitoUser.deleteUser(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }

    authenticateCognitoUser = function(username, password) {
      
      function getAuthenticationDetails(uname, pword) {
        var authenticationData = {
          Username : uname,
          Password : pword,
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        return authenticationDetails;
      }

      function getUserPool() {
        var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n', ClientId : '4pe2usejqcdmhi0a25jp4b5sh3' };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        return userPool;
      }

      function getCognitoUser(uname, upool) {
        var userData = { Username : uname, Pool : upool };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        return cognitoUser;
      }
    
      var authenticationDetails = getAuthenticationDetails(username, password)
      var userPool    = getUserPool();
      var cognitoUser = getCognitoUser(username, userPool);
      
      
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              console.log('access token + ' + result.getAccessToken().getJwtToken());
              /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
              console.log('idToken + ' + result.idToken.jwtToken);
          },
          onFailure: function(err) {
              alert(err);
          },
      });
    }

    signupForApplication = function(emailAddress, password) {
      var attribute = { Name : 'email', Value : emailAddress };
      var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
      var attributeList = [];
      attributeList.push(attributeEmail);
      var cognitoUser;

      userPool.signUp(emailAddress, password, attributeList, null, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          cognitoUser = result.user;
          // remove later
          console.log('CognitoUser => ', cognitoUser);
      });
    }

    updateAttributesOnUser = function(username, obj) {
      function getUserPool() {
        var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n', ClientId : '4pe2usejqcdmhi0a25jp4b5sh3' };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        return userPool;
      }
      function getCognitoUser(uname, upool) {
        var userData = { Username : uname, Pool : upool };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        return cognitoUser;
      }
      function buildAttribute(keyName, value) {
        var attribute = {
          Name: keyName,
          Value: value
        }
        var result = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
        return result;
      }
      function buildAttributeList(attributeBuilder, obj) {
        var attrList = [];
        var attrToAdd;
        for (var key in obj) {
          attrToAdd = attributeBuilder(key, obj[key]);
          attrList.push(attrToAdd);
        }
        return attrList;
      }
      var attributeList = buildAttributeList(buildAttribute, obj);
      var cognitoUser   = getCognitoUser(username, getUserPool());
      cognitoUser.updateAttributes(attributeList, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          console.log('call result: ' + result);
      });
    }

    deleteUserAttributes = function(cognitoUser, attributeList) {
      cognitoUser.deleteAttributes(attributeList, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          console.log('call result: ' + result);
      });
    }

    verifyUserAttribute = function(cognitoUser, attributeName) {
        cognitoUser.getAttributeVerificationCode(attributeName, {
          onSuccess: function (result) {
              console.log('call result: ' + result);
          },
          onFailure: function(err) {
              alert(err);
          },
          inputVerificationCode: function() {
              var verificationCode = prompt('Please input verification code: ' ,'');
              cognitoUser.verifyAttribute(attributeName, verificationCode, this);
          }
      });
    }

    retrieveUserAttributes = function(cognitoUser) {
      cognitoUser.getUserAttributes(function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          for (i = 0; i < result.length; i++) {
              console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
          }
      });
    }

    resendConfirmationCode = function(cognitoUser) {
      cognitoUser.resendConfirmationCode(function(err, result) {
          if (err) {
              alert(err);
              return;
              }
              alert(result);
      });
    }

    confirmRegistration = function(cognitoUser, confirmationCode) {
      cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          alert(result);
      });
    }

    changePassword = function(cognitoUser, oldPassword, newPassword) {
      cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }

    forgotPasswordFlow = function(cognitoUser) {
      cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' ,'');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
      });
    }

    deleteUser = function(cognitoUser) {
      cognitoUser.deleteUser(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }

    signUserOut = function(cognitoUser) {
      if (cognitoUser != null) {
          cognitoUser.signOut();
      }
    }

    signUserOutGlobally = function(cognitoUser) {
      cognitoUser.globalSignOut();
    }

    getCurrentUserFromLocalStorage = function(userPool) {
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
               alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : '...' // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
                }
            });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        });
      }
    }

    confirmRegisteredUnauthenticatedUser = function(userName, confirmationCode) {
      
      function getUserPool() {
        var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n', ClientId : '4pe2usejqcdmhi0a25jp4b5sh3'};
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        return userPool;
      }

      function getCognitoUser(userName, userPool) {
        var userData = { Username : userName, Pool : userPool };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        return cognitoUser();
      }

      var cognitoUser = getCognitoUser(userName, getUserPool());
      
      cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          console.log('call result: ' + result);
      });
    }

    return {
     
    };
  }


})();