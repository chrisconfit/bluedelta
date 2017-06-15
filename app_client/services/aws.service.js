(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window', '$q', 'AWSConfig'];
  function aws ($http, $window, $q, AWSConfig) {
			
    function _getUserPool() {
      var poolData = { UserPoolId : AWSConfig.USER_POOL_ID, ClientId : AWSConfig.CLIENT_ID };
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
		

		authenticateViaFB = function(){
			
			var defer = $q.defer();
			
			FB.login(function (response) {
			  if (response.authResponse) { // logged in
			    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			      IdentityPoolId: AWSConfig.IDENTITY_POOL_ID,
			      Logins: {
			        'graph.facebook.com': response.authResponse.accessToken
			      }
			    });
			
			    defer.resolve();
			  } else {
			    defer.reject('There was a problem logging in with Facebook.');
			  }
			});
			
			return defer.promise;		
		}
		
    authenticateCognitoUser = function(username, password) {
      var authenticationDetails = _getAuthenticationDetails(username, password);
      var cognitoUser = _getCognitoUser(username, _getUserPool());
      
      var defer = $q.defer();
      
      
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
					defer.resolve(result);
					console.log('access token + ' + result.getAccessToken().getJwtToken());
					//Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer
					console.log('idToken + ' + result.idToken.jwtToken);
        },
        onFailure: function(err) {
          defer.reject(err);
        }, 
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.
					console.log(userAttributes, requiredAttributes);

          // the api doesn't accept this field back
          //delete userAttributes.email_verified;

          // Get these details and call
	        // cognitoUser.completeNewPasswordChallenge("ConfitConfit@123", userAttributes, this);
	      }
      });
      
      return defer.promise;
    }
		

    signupForApplication = function(emailAddress, password) {
	    
	    var defer = $q.defer();
	    
      var attributeList = _buildAttributeList(_buildAttribute, {email: emailAddress});
      var cognitoUser;
      _getUserPool().signUp(emailAddress, password, attributeList, null, function(err, result) {
        if (err) defer.reject(err);
        else defer.resolve(result);
      });
      
      return defer.promise;
    }

    updateAttributesOnUser = function(username, obj) {      
      var attributeList = _buildAttributeList(_buildAttribute, obj);
      var cognitoUser   = _getCognitoUser(username, _getUserPool());
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
	    if(!cognitoUser.resendConfirmationCode){
		  	//We've just got an email address...
		  	cognitoUser = _getCognitoUser(cognitoUser, _getUserPool());
	    }
	    
      cognitoUser.resendConfirmationCode(function(err, result) {
	      
	      //TODO: This function throws an error on success that obscures a promise. Once the SDK has been fixed, we need to implement a promise structure to properly display results on the front end.
        if (err) {
          console.log(err);
          return;
        }
        
        //code has been sent
        return true;
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
        
        inputVerificationCode: function() {
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
    
    signCurrentUserOut = function() {
	  	var cognitoUser = _getUserPool().getCurrentUser();
      if (cognitoUser != null) {
          cognitoUser.signOut();
      }
    }


    signUserOutGlobally = function(cognitoUser) {
      cognitoUser.globalSignOut();
    }
		
		

    getCurrentUserFromLocalStorage = function() {

	    var defer = $q.defer();
	    
      var cognitoUser = _getUserPool().getCurrentUser();
      
    
      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
        	
        	//TODO: Decide if further error handling is necessary...
          if (err) {
            defer.reject(err);
            return defer.promise;
          }
					
					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : AWSConfig.IDENTITY_POOL_ID
          });
	          
          //var loginKey = 'cognito-idp.'+AWSConfig.REGION+'.amazonaws.com/'+AWSConfig.USER_POOL_ID;
          defer.resolve(session);
          
					// Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
        });
      }else{
	      defer.reject("User is not logged in...");
      }
      
      return defer.promise;
    }
		
		
    confirmRegisteredUnauthenticatedUser = function(userName, confirmationCode) {
	    
      var cognitoUser = _getCognitoUser(userName, _getUserPool());
	    var defer = $q.defer();
      
      cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) defer.reject(err);
        else defer.resolve(result);
      });
      
      return defer.promise;
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
    
    saveImageTos3 = function (image){
	    console.log('saveto');
	    
			var albumBucketName = 'blue-delta-api-development-stack-userdatabucket-12z57hiicf3xy';
			var bucketRegion = 'us-east-1';
			var IdentityPoolId = AWSConfig.IDENTITY_POOL_ID;
			
			AWS.config.update({
				region: bucketRegion,
				credentials: new AWS.CognitoIdentityCredentials({
					IdentityPoolId: IdentityPoolId
				})
			});
			
			var s3 = new AWS.S3({
				apiVersion: '2006-03-01',
				params: {Bucket: albumBucketName}
			});
			
	   
	    console.log(s3);
	    
			//TODO: Save image
			

    }
 
     
      
    
    return {
	    authenticateViaFB: authenticateViaFB,
	    getUserFromLocalStorage: getUserFromLocalStorage,
      deleteCognitoUser: deleteCognitoUser,
      authenticateCognitoUser: authenticateCognitoUser,
      signupForApplication: signupForApplication,
      updateAttributesOnUser: updateAttributesOnUser,
      deleteUserAttributes: deleteUserAttributes,
      verifyUserAttribute: verifyUserAttribute,
      retrieveUserAttributes: retrieveUserAttributes,
      resendConfirmationCode: resendConfirmationCode,
      confirmRegistration: confirmRegistration,
      changePassword: changePassword,
      forgotPasswordFlow: forgotPasswordFlow,
      deleteUser: deleteUser,
      signUserOut: signUserOut,
      signUserOutGlobally: signUserOutGlobally,
      getCurrentUserFromLocalStorage: getCurrentUserFromLocalStorage,
      confirmRegisteredUnauthenticatedUser: confirmRegisteredUnauthenticatedUser,
      signCurrentUserOut:signCurrentUserOut,
      saveImageTos3 : saveImageTos3
    };
  }
})();