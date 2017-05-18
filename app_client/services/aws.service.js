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
      var authenticationData = {
        Username : username,
        Password : password,
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n', ClientId : '4pe2usejqcdmhi0a25jp4b5sh3' };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      var userData = { Username : username, Pool : userPool };
      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

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

      // JAKE! add stuff to make this function referentially transparent


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



    }


    return {
     
    };
  }


})();