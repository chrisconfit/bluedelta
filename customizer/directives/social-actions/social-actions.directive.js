(function () {

  angular
    .module('bdApp')
    .directive('socialActions', [function() {
    	
			return {
	    	
	      restrict: 'EA',
	      replace:true,
				templateUrl: '/directives/social-actions/social-actions.template.html',
	      scope : {
	        jean : '=',
	        display: '=',
	        onsave:'='
	      },
	      controller: 'socialCtrl as sovm',

	      
	   };
    
    
  }]);

})();