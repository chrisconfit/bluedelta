(function() {

  angular
    .module('bdApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    
    var getOptions = function () {	    
      return $http.get('/api/options', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
		
		
		
		
		
		
		//Placeholders
		var getStyles = function(){
			return $http.get('/data/styles.json');
		};
		
		var getThreads = function(){
			return $http.get('/data/threads.json');
		};
		
		var getHardware = function(){
			return $http.get('/data/buttons.json');
		};
		
		var getFabrics = function(){
			return $http.get('/data/fabrics.json');
		};
		
		
		var getGenders = function(){
			return $http.get('/data/genders.json');
		};
		
		
		
		
    return {
      getProfile : getProfile,
      getOptions : getOptions,
      getStyles : getStyles,
      getThreads : getThreads,
      getHardware: getHardware,
      getFabrics: getFabrics,
      getGenders: getGenders
    };
  }

})();