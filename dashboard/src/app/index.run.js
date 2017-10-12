(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(["$rootScope", "$state", "user", "api", runBlock]);

  /** @ngInject */
  function runBlock($rootScope, $state, user, api) {
	  
	  api.getAppData();
		
		//Set up user if already logged in	
		console.log("get tok");
		console.log(user.getToken());
		
		if (user.getToken()){
			user.setup();
		}
		
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, err){
			console.log(err);
		  console.log('$stateChangeError - fired when an error occurs during transition.');
		  console.log(arguments);
		});
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
			
	    if (toState.authenticate && !(user.isLoggedIn() || user.isAdmin()) ){
	      $state.transitionTo("login");
	      event.preventDefault(); 
	    }
	  });
	
   
  }

})();
