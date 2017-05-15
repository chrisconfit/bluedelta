(function () {

  angular
    .module('bdApp')
    .service('aws', aws);

  aws.$inject = ['$http', '$window'];
  function aws ($http, $window) {
    
    AWSCognito.config.region = 'us-east-1';
    
    createUserPool = function(validPoolData) {
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(validPoolData);
        return userPool;
    }
    
    var configSettings = {
      poolData: {
        UserPoolId : 'us-east-1_LOGu3QxlG',
        ClientId   : '722lmps6diglhvjek6gmrk4g69'
      }
    }

    return {
	    createUserPool: createUserPool,
	    configSettings: configSettings
    };
  }


})();