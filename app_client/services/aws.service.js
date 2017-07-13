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
      
    function _parseIdentityId(jwt){
	    var idTokenPayload = jwt.split('.')[1];
			return JSON.parse(atob(idTokenPayload)).sub;				
    }
    
		function _getAWSCredentials(idToken){

			logins = {}
			var authenticator = 'cognito-idp.'+AWSConfig.REGION+'.amazonaws.com/'+AWSConfig.USER_POOL_ID;
			logins[authenticator] = idToken;

			AWS.config.update({ region: AWSConfig.REGION });

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWSConfig.IDENTITY_POOL_ID,
        Logins : logins
			});

			return AWS.config.credentials.getPromise();

	    // if (AWS.config.credentials.needsRefresh()){
	    //   AWS.config.credentials.clearCachedId();
	    //   AWS.config.credentials.get(function(err){
	    //     if (err) {
	    //       defer.reject(err);
	    //     }
	    //     defer.resolve();
	    //   });
	    // } else {
	    //   AWS.config.credentials.get(function(err){
	    //     if (err) {
	    //       defer.reject(err);
	    //     }
	    //     defer.resolve();
	    //   });
	    // }
			//
			// return defer.promise;
			
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
					//Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer
					$window.localStorage.isLoggedIn = true;
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
				$window.localStorage.isLoggedIn = false;
      }
    }


    signUserOutGlobally = function(cognitoUser) {
	    $window.localStorage.isLoggedIn = false;
      cognitoUser.globalSignOut();
    }
		
		

    getCurrentUserFromLocalStorage = function() {
      var cognitoUser = _getUserPool().getCurrentUser();
      if (cognitoUser != null) {
      	return cognitoUser.getSession(function(err, session) {
          if (err) {
	          console.log(err);
	          return false;
          }
          return session;
        });
      }else{
	      console.log("You are not logged in");
	      return false;
      }
    }
    
    
		
		isLoggedIn = function() {
			var cognitoUser = _getUserPool().getCurrentUser();
			return cognitoUser ? true: false;
		}
		
		agetCurrentUserFromLocalStorage = function() {

			var cognitoUser = _getUserPool().getCurrentUser();
			if (cognitoUser != null) {

				cognitoUser.getSession(function(err, session) {
												
					if (err){
						return false;
						console.log(err);
					}

					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          	IdentityPoolId : AWSConfig.IDENTITY_POOL_ID
        	});
					
					//User is logged in
					return session;
				});
			}
			
			else{return false;}
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
   
    
    
    
    
    //Save an image to s3 Bucket
    saveImageTos3 = function (imageURL, userTokens){
			
		function dataURItoBlob(dataURI) {
			var binary = atob(dataURI.split(',')[1]);
			var array = [];
			for(var i = 0; i < binary.length; i++) {
			  array.push(binary.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
		}
			
			
			var defer = $q.defer();
			

			_getAWSCredentials(userTokens.idToken.jwtToken).then(

				//Got credentials.. now save image
				function(){
					var blobData = dataURItoBlob(imageURL);
					var bucketName = 'blue-delta-api-development-stack-userdatabucket-12z57hiicf3xy';
					var s3bucket = new AWS.S3({region: AWSConfig.REGION, params: {Bucket: bucketName}});
					var params = {Key: AWS.config.credentials.identityId + "/" + "myfilename.png", Body: blobData};

					s3bucket.upload(params, function(err, data){	      
						if (err) defer.reject(err);
						else  defer.resolve(data.Location);						
    			});
    			
				},
				
				//Can't get AWS Credentials
				function(err){
					defer.reject(err);
				}
			);
			
			return defer.promise;

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
      saveImageTos3 : saveImageTos3,
      isLoggedIn:isLoggedIn
    };
  }
})();