(function () {

  angular
    .module('bdApp')
    .directive('jeanList', ['jean', function(jean) {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        fields : '=?'
	      },
	      
	      link: function($scope){
		      
					$scope.data = jean.getJsonData();
					$scope.dataLookup = jean.dataLookup;
					jean.setup().then(function(result){
						$scope.jean = result
					});
					var defaultFields = [
						'fabric',
						'accentThread',
						'topThread',
						'bottomThread',
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