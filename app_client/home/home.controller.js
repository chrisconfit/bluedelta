(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['$scope','jean'];

		
    function homeCtrl ($scope, jean) {
	    
	    $scope.jean = jean.data;
	    
      console.log('Home controller is running');
    }

})();