(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {
    
    
    
    
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
	    createUserPool: createUserPool,
	    registerUser: registerUser
    };
  }


})();