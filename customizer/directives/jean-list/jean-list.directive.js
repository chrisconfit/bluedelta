(function () {

  angular
    .module('bdApp')
    .directive('jeanList', ['jean', 'jsonData', function(jean, jsonData) {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        fields : '=?',
	        jean: '=?'
	      },
	      
	      link: function($scope){
					
					$scope.dataBank = jsonData;
					$scope.jean = $scope.jean || jean.get();
				
					var defaultFields = [
						'fabric',
						'accent_thread',
						'top_thread',
						'bottom_thread',
						'gender',
						'style'
					];

					$scope.fields = $scope.fields || defaultFields;
					
					$scope.dataLookup = function(key, value, field){
						if (typeof(value)=="object") return value[field];
						var data = jsonData[key];
						for (d=0;d<data.length;d++){
							if (data[d].id == value){
								return data[d][field];
							}
						}

												
					};
					
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