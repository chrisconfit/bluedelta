(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {

    function _getUserPool() {
      var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n', ClientId : '4pe2usejqcdmhi0a25jp4b5sh3' };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      return userPool;
    }

    function _getAuthenticationDetails(uname, pword) {
      var authenticationData = {
        Username : uname,
        Password : pword,
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      return authenticationDetails;
    }

    function _getCognitoUser(uname, upool) {
      var userData = { Username : uname, Pool : upool };
      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      return cognitoUser;
    }

    function _buildAttribute(keyName, value) {
      var attribute = {
        Name: keyName,
        Value: value
      }
      var result = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
      return result;
    }

    function _buildAttributeList(attributeBuilder, obj) {
        var attrList = [];
        var attrToAdd;
        for (var key in obj) {
          attrToAdd = attributeBuilder(key, obj[key]);
          attrList.push(attrToAdd);
        }
        return attrList;
      }
    

    getUserFromLocalStorage = function(username) {
      var cognitoUser = _getCognitoUser(username, _getUserPool());
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
      var cognitoUser = _getUserPool().getCurrentUser();
      cognitoUser.deleteUser(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }

    authenticateCognitoUser = function(username, password) {
      var authenticationDetails = _getAuthenticationDetails(username, password)
      var cognitoUser = _getCognitoUser(username, _getUserPool());
      
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
      
      var attributeList = _buildAttributeList(_buildAttribute, {email: emailAddress});

      var cognitoUser;

      _getUserPool().signUp(emailAddress, password, attributeList, null, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          cognitoUser = result.user;
      });
    }

    updateAttributesOnUser = function(username, obj) {
      function getCognitoUser(uname, upool) {
        var userData = { Username : uname, Pool : upool };
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        return cognitoUser;
      }
      
      
      var attributeList = _buildAttributeList(_buildAttribute, obj);
      var cognitoUser   = getCognitoUser(username, _getUserPool());
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

    getCurrentUserFromLocalStorage = function() {
      var cognitoUser = _getUserPool().getCurrentUser();
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
      var cognitoUser = _getCognitoUser(userName, _getUserPool());
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