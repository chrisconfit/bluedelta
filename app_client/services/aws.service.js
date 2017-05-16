(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {
    
    userAttributeConstructor = AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute;
    
    
    
    createUserAttributeList = function(userDetailObj, cognitoUserAttrConstructorFunction, allowedFields) {
      var newAttributeList = [];
      for (var keyName in userDetailObj) {
        if (allowedFields.indexOf(keyName) !== -1 ) {
          newAttributeList.push(new cognitoUserAttrConstructorFunction({
            Name: keyName,
            Value: userDetailObj[keyName]
          }));
        }
      }
      return newAttributeList;
    }
    
    createUserPool = function(validPoolData) {
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(validPoolData);
        return userPool;
    }
    
    
    registerUser = function(userPool, userName, password, attributeList) {
      var validatorsOrNull = null;
      userPool.signUp(userName, password, attributeList, validatorsOrNull, function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        var cognitoUser = result.user;
        // console.log('user name is ' + cognitoUser.getUsername());
      })
    }

    return {
      userAttributeConstructor: userAttributeConstructor,
      createUserAttributeList: createUserAttributeList,
	    createUserPool: createUserPool,
	    registerUser: registerUser
    };
  }


})();