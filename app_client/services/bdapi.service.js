
(function() {

  angular
    .module('bdApp')
    .service('bdAPI', bdAPI);

  bdAPI.$inject = ['$window', '$http', '$httpParamSerializer'];
  function bdAPI ($window, $http, $httpParamSerializer) {
		// if($window.BlueDeltaApi){
	  //   //Delete moment from window so it's not globally accessible.
	  //   //  We can still get at it through _thirdParty however, more on why later
	    $window._thirdParty = $window._thirdParty || {};
	  //   $window._thirdParty.BlueDeltaApi = $window.BlueDeltaApi;
	  //   try { delete $window.BlueDeltaApi; } catch (e) {$window.BlueDeltaApi = undefined;}
	  // }
	  $window._thirdParty.BlueDeltaApi =new API.Client.DefaultApi(angular.injector(["ng"]).get("$http"),
          angular.injector(["ng"]).get("$httpParamSerializer"),
          angular.injector(["ng"]));
      //
      //
      var BlueDeltaApi = $window._thirdParty.BlueDeltaApi;

		// //JSON Data
		BlueDeltaApi.jsonData = {};

		BlueDeltaApi.jsonData.getJeansByUser = function(userId){
			return $http.get('/data/chris-jeans.json');
		};

		BlueDeltaApi.jsonData.getProfile = function(){
			return $http.get('/data/profile.json');
		};

		BlueDeltaApi.jsonData.getStyles = function(){
			return $http.get('/data/styles.json');
		};

		BlueDeltaApi.jsonData.getThreads = function(){
			return $http.get('/data/threads.json');
		};

		BlueDeltaApi.jsonData.getHardware = function(){
			return $http.get('/data/buttons.json');
		};

		BlueDeltaApi.jsonData.getFabrics = function(){
			return $http.get('/data/fabrics.json');
		};

		BlueDeltaApi.jsonData.getGenders = function(){
			return $http.get('/data/genders.json');
		};

	  return BlueDeltaApi;
  }

})();