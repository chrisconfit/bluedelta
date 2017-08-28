(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, user) {
		
		//Set up user if already logged in	
		
		if (user.getToken()){
			user.setup();
		}
		
		
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
			
			console.log("AUTH");
			console.log(user.isLoggedIn(), user.isAdmin())
			
	    if (toState.authenticate && !(user.isLoggedIn() || user.isAdmin()) ){
	      $state.transitionTo("login");
	      event.preventDefault(); 
	    }
	  });
	
   
  }

})();
