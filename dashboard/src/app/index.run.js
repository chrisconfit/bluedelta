(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(["$rootScope", "$state", "user", "api", runBlock]);

  /** @ngInject */
  function runBlock($rootScope, $state, user, api) {
	  
	  api.getAppData();
		
		//Set up user if already logged in
		if (user.getToken()){
			user.setup();
		}
		
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, err){
		  console.log('$stateChangeError - fired when an error occurs during transition.');
		  console.log(arguments);
		});
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
	    if (toState.authenticate && (!user.isLoggedIn() || !user.isAdmin()) ){
	    	
	    	console.log("NOT LOGGED IN!!! "+!user.isLoggedIn());
        console.log("NOT ADMIN IN!!! "+!user.isAdmin());
        
	      $state.transitionTo("login");
	      event.preventDefault(); 
	    }
	  });
    $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
	
   
  }

})();
