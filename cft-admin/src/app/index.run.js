(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, aws) {

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
	    if (toState.authenticate && !aws.isLoggedIn()){
	      // User isn’t authenticated
	      $state.transitionTo("login");
	      event.preventDefault(); 
	    }
	  });
	
   
  }

})();
