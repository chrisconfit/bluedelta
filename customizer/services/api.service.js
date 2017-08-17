
(function() {

  angular
    .module('bdApp')
    .service('api', api);
		
	api.$inject = ['$http', '$q', '$rootScope'];
  function api($http, $q, $rootScope) {

	  var login = function(args){
		  console.log(args[0], args[1]);
		  return $http.get("/");
		}
	  
		var call = function(func, args, success, error){
			console.log(func);
			console.log(this);
			this[func](args)
			.success(function(result){
				$rootScope.$$phase || $rootScope.$apply();
				if (success) success(result.data);
			})
			.error(function(err){
				console.log(err.message);
				if (error) error(err);
			});
		}
		
		
    return {
      call : call,
      login: login,
    };
    
  }

})();