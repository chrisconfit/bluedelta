(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['$scope','jean', '$animate'];

		
    function homeCtrl ($scope, jean, $animate) {
	    
			$scope.lions = false;
			$scope.cranes = false;
			
	    
	    
	    	    	    
	    $scope.jean = jean.data;
	    	
      console.log('Home controller is running');
    }

})();