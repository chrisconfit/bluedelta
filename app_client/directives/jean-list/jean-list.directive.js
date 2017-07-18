(function () {

  angular
    .module('bdApp')
    .directive('jeanList', ['jean','jsonData', function(jean, jsonData) {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        fields : '=?'
	      },
	      
	      link: function($scope){
		      
					$scope.data = jsonData.getData();
					$scope.dataLookup = jsonData.dataLookup;
					jean.setup().then(function(result){
						$scope.jean = result
					});
					console.log($scope.jean);
					var defaultFields = [
						'fabric',
						'accent_thread',
						'top_thread',
						'bottom_thread',
						'gender',
						'style'
					];

					$scope.fields = $scope.fields || defaultFields;

					$scope.filterFields = function(data){
						matches = {};
						for (var k in data) {
		        	if (data.hasOwnProperty(k) && $scope.fields.indexOf(k)>=0) {
					  	  matches[k]=data[k];
					    }
						}
						return matches;
					}

		   
	      }
	      
	   };
    
    
  }]);

})();