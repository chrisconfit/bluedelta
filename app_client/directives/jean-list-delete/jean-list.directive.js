(function () {

  angular
    .module('bdApp')
    .directive('jeanList', [function() {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        jean : '='
	      },
	      
	      link: function($scope){
				
	      }
	      
	   };
    
    
  }]);

})();