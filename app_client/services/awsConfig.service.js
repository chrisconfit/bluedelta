(function () {

  angular
    .module('bdApp')
    .service('awsConfig', awsConfig);

  awsConfig.$inject = ['$http', '$window'];
  function awsConfig ($http, $window) {
      
      
    
    var region = 'us-east-1';
    AWSCognito.config.region = region;
    
    
    var poolInfo = {
            UserPoolId : 'us-east-1_LOGu3QxlG',
            ClientId   : '722lmps6diglhvjek6gmrk4g69'
        };
    

    return {
	    poolInfo: poolInfo,
	    region: region
    };
  }


})();