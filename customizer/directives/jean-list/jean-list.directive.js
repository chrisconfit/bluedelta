(function () {

  angular
    .module('bdApp')
    .directive('jeanList', ['jean', 'apiData', function(jean, apiData) {
    	
			return {
	    	
	      restrict: 'EA',
				templateUrl: '/directives/jean-list/jean-list.template.html',
	      scope : {
	        fields : '=?',
	        jean: '=?'
	      },
	      
	      link: function($scope){
					
					$scope.dataBank = apiData;
					$scope.jean = $scope.jean || jean.get();
				
					var defaultFields = [
						'fabric_id',
						'accent_thread_id',
						'top_thread_id',
						'bottom_thread_id',
						'gender',
						'style_option_id'
					];

					$scope.findLabel = function(field){
						var fieldLabels = {
							'fabric_id' : 'Fabric',
							'accent_thread_id' : 'Accent Thread',
							'top_thread_id' : 'Top Thread',
							'bottom_thread_id' : 'Bottom Thread',
							'gender' : 'Gender',
							'style_option_id' : 'Style'
						}
					  return fieldLabels[field]; // otherwise it won't be within the results
					};
					
					
					$scope.fields = $scope.fields || defaultFields;
					
					$scope.dataLookup = function(key, value){
							
						var dataMap = {
							'fabric_id' : 'fabrics',
							'accent_thread_id' : 'threads',
							'top_thread_id' : 'threads',
							'bottom_thread_id' : 'threads',
							'gender' : 'gender_options',
							'style_option_id' : 'style_options'
						}
						var key = dataMap[key];
						var data = apiData[key];
						for (d=0;d<data.length;d++){
							if (data[d].id == value) return data[d].name;
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