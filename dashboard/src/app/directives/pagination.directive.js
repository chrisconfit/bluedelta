(function () {

  angular
    .module('inspinia')
    .directive('pagination', [function() {
    	
			return {
	      restrict: 'EA',
				templateUrl: '/app/directives/pagination.template.html',
				replace:true,
	      scope : {
		      total : '=',
		      current: '=',
		      change: '='
	      },
	      link:function($scope){
		      $scope.getTotalRange = function() {
			      return $scope.total >= 1 ? new Array($scope.total) : false;   
					}
	      }
	   };
    
    
  }]);

})();