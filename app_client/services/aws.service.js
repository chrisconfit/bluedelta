(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {
    
    // var dataFullName = {
    //     Name: 'full_name',
    //     Value: 'Firstname Last'
    // };
    createUserAttribute = AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute;
    // new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFullName)
    
    // for now just log what we got
    createUserAttributeList = function(userDetailObj, cognitoUserAttrConstructorFunction) {
      var newAttributeList = [];
      for (var keyName in userDetailObj) {
        if (keyName !== 'password') {
          newAttributeList.push(new cognitoUserAttrConstructorFunction({
              Name: keyName,
              Value: userDetailObj[keyName]
            })
          );
        }
      }
      return newAttributeList;
    }
    
    createUserPool = function(validPoolData) {
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(validPoolData);
        return userPool;
    }
    
    
    registerUser = function(userPool, userName, password, attributeList) {
      console.log('insid');
      
      var validatorsOrNull = null;
      
      userPool.signUp(userName, password, attributeList, validatorsOrNull, function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
      })
    }

    return {
      createUserAttribute: createUserAttribute,
      createUserAttributeList: createUserAttributeList,
	    createUserPool: createUserPool,
	    registerUser: registerUser
    };
  }


})();