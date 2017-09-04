(function() {

  angular
    .module('bdApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {
		
		/*
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    */
    var getOptions = function () {	    
      return $http.get('/api/options', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
		
		
		
		
		var getJeanById = function(id, callback){
			$http.get('/data/chris-jeans.json').then(function(response){
				var jeans = response.data;
				for(j=0; j<response.data.length; j++){

					if (response.data[j].id == id){
						console.log('jean found');
						var ret = response.data[j];
					}
				}
				
				callback(ret);

			});
		}
		
		//Placeholders
		var getJeansByUser = function(userId){
			return $http.get('/data/chris-jeans.json');
		};		
		var getProfile = function(){
			return $http.get('/data/profile.json');
		};
		
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
	    getJeanById: getJeanById,
	    getJeansByUser : getJeansByUser,
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