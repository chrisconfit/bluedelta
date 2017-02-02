(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['$scope','jean', '$animate'];

		
    function homeCtrl ($scope, jean, $animate) {
	    	    	    
	    $scope.jean = jean.data;
	    	
    }

})();