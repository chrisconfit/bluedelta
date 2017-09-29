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
						'fabric_type',
						'top_thread_id',
						'bottom_thread_id',
						'accent_thread_id',
						'gender_option_id',
						'style_option_id'
					];

					$scope.findLabel = function(field){
						var fieldLabels = {
							'fabric_id' : 'Fabric',
							'fabric_type': 'Fabric Type',
							'accent_thread_id' : 'Accent Thread',
							'top_thread_id' : 'Top Thread',
							'bottom_thread_id' : 'Bottom Thread',
							'gender_option_id' : 'Gender',
							'style_option_id' : 'Style'
						}
					  return fieldLabels[field]; // otherwise it won't be within the results
					};
					
					
					$scope.fields = $scope.fields || defaultFields;
					
					$scope.dataLookup = function(field){
						
						//Special handling for fabric_type
						if (field.indexOf('fabric_type') > -1){
							for (d=0; d<apiData.fabrics.length; d++){
								if (apiData.fabrics[d].id == $scope.jean.fabric_id){
									return apiData.fabrics[d].fabric_type;
								}
							}
						}
							
						//Fields on Jean that are not IDs
						if (field.indexOf('id') < 0){
							return $scope.jean[field];
						}
						
						//If we're using an id.. let's look it up.
						var dataMap = {
							'fabric_id' : 'fabrics',
							'accent_thread_id' : 'threads',
							'top_thread_id' : 'threads',
							'bottom_thread_id' : 'threads',
							'gender_option_id' : 'gender_options',
							'style_option_id' : 'style_options'
						}
						
						
						var key = dataMap[field];
						var value = $scope.jean[field];
						var data = apiData[key];
												
						for (d=0; d<data.length; d++){
							//Quick fix for genders...
							if (data[d].gender){
								 data[d].name = data[d].gender;
							}
							if (data[d].id == value){
							 return data[d].name;
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