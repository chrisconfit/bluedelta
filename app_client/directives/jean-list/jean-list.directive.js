(function () {

  angular
    .module('bdApp')
    .directive('jeanList', ['jsonData', function(jsonData) {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        jean : '=',
	        fields : '=?'
	      },
	      
	      link: function($scope){
					$scope.data = jsonData.getData();
					$scope.dataLookup = jsonData.dataLookup;
					
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