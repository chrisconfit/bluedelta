
/*
*
* This controller is designed to be a child of closet.controller. It refernces $scope.$scope.vm.user throughout and needs to inherit $scope.vm.user from a parent
*
*/

(function() {
  
  angular
    .module('bdApp')
    .controller('addFormCtrl', addFormCtrl);

  addFormCtrl.$inject = ['$scope', '$filter', 'bdAPI', 'messages', 'api'];
  function addFormCtrl($scope, $filter, bdAPI, messages, api) {
	  
	  
	  $scope.editing=false;
	  $scope.active=false;
		$scope.addForm = {};
		$scope.model = {};
		
		var addFormFields = ['addressLine1','addressLine2','city','state','zip'];
		
		
		//Choose Primary Address
		$scope.choosePrimary = function(address){
			
			console.log("choosing primary!!");
			console.log(address);
			
			for (a = 0; a< $scope.vm.user.address.length; a++){
				var add = $scope.vm.user.address[a];
				add.primary = (add.id == address.id ? true :false);
			}
			
			api.call('postAddress', address, function(result){
				console.log('saved');
			});
		}

		
		$scope.startEditing = function(){
			//Bring Primary address to the top
			$scope.vm.user.address = $filter('orderBy')($scope.vm.user.address, '-primary');
			$scope.editing = true;
		}
		
		$scope.stopEditing = function(){
			$scope.editing = false;
		}



		$scope.editAdd = {};
		
		//Open Address Form
		$scope.open = function(index){

			$scope.active = true;
			if (!$scope.vm.user.address) $scope.vm.user.address = [];
			//New Address
			if (typeof index === 'undefined'){
				$scope.model = {};
				$scope.editAdd.index = $scope.vm.user.address.push($scope.model) -1;
				$scope.editAdd.data = null;	
			}
			
			//Editing Existing...
			else{
				$scope.model = $scope.vm.user.address[index];
				$scope.editAdd.index = index;
				$scope.editAdd.data =  angular.copy($scope.model);
			}
						
		}
		

		function resetForm(close){
			close = close || true;
			$scope.editAdd = {};
			$scope.model = {};
			if (close) $scope.active = false;
		}
		
		function removeAddress(index){
			$scope.vm.user.address.splice(index, 1);
		}
	
		
		//Clear Address Form
		$scope.clear = function(){
			var dataObj = $scope.editAdd.data;
			if (dataObj == null) removeAddress($scope.editAdd.index);//Remove Address
			else $scope.vm.user.address[$scope.editAdd.index] = $scope.editAdd.data;//Reset Address
			resetForm();			
		}
		
		
		//Remove Address and save user
		$scope.remove = function(index){
			
			if ($scope.vm.user.address.length < 2){
				messages.set("You can't remove your last address", "error");
				return false;	
			}
			
			var wasPrimary = $scope.vm.user.address[index].primary;	
			removeAddress(index);
			if(wasPrimary) $scope.choosePrimary(0);
			bdAPI.saveUser($scope.vm.user);
		}
		
		//Save Form
		$scope.save = function(){
		 	var primary = $scope.vm.user.address.filter(function(add){
				return add.primary == true;
 			});
 			if (!primary.length) $scope.vm.user.address[0].primary=true;
 				
			bdAPI.saveUser($scope.vm.user).then(
				function(result){
					$scope.newAdd = null;
					$scope.active = false;
					$scope.model = {};
					$scope.$apply();
				}
			);
			
			
		}
		
		
		//US States
		$scope.states = [
			{
			  "name": "Alabama",
			  "abbreviation": "AL"
			},
			{
			  "name": "Alaska",
			  "abbreviation": "AK"
			},
			{
			  "name": "Arizona",
			  "abbreviation": "AZ"
			},
			{
			  "name": "Arkansas",
			  "abbreviation": "AR"
			},
			{
			  "name": "California",
			  "abbreviation": "CA"
			},
			{
			  "name": "Colorado",
			  "abbreviation": "CO"
			},
			{
			  "name": "Connecticut",
			  "abbreviation": "CT"
			},
			{
			  "name": "Delaware",
			  "abbreviation": "DE"
			},
			{
			  "name": "District Of Columbia",
			  "abbreviation": "DC"
			},
			{
			  "name": "Florida",
			  "abbreviation": "FL"
			},
			{
			  "name": "Georgia",
			  "abbreviation": "GA"
			},
			{
			  "name": "Hawaii",
			  "abbreviation": "HI"
			},
			{
			  "name": "Idaho",
			  "abbreviation": "ID"
			},
			{
			  "name": "Illinois",
			  "abbreviation": "IL"
			},
			{
			  "name": "Indiana",
			  "abbreviation": "IN"
			},
			{
			  "name": "Iowa",
			  "abbreviation": "IA"
			},
			{
			  "name": "Kansas",
			  "abbreviation": "KS"
			},
			{
			  "name": "Kentucky",
			  "abbreviation": "KY"
			},
			{
			  "name": "Louisiana",
			  "abbreviation": "LA"
			},
			{
			  "name": "Maine",
			  "abbreviation": "ME"
			},
			{
			  "name": "Maryland",
			  "abbreviation": "MD"
			},
			{
			  "name": "Massachusetts",
			  "abbreviation": "MA"
			},
			{
			  "name": "Michigan",
			  "abbreviation": "MI"
			},
			{
			  "name": "Minnesota",
			  "abbreviation": "MN"
			},
			{
			  "name": "Mississippi",
			  "abbreviation": "MS"
			},
			{
			  "name": "Missouri",
			  "abbreviation": "MO"
			},
			{
			  "name": "Montana",
			  "abbreviation": "MT"
			},
			{
			  "name": "Nebraska",
			  "abbreviation": "NE"
			},
			{
			  "name": "Nevada",
			  "abbreviation": "NV"
			},
			{
			  "name": "New Hampshire",
			  "abbreviation": "NH"
			},
			{
			  "name": "New Jersey",
			  "abbreviation": "NJ"
			},
			{
			  "name": "New Mexico",
			  "abbreviation": "NM"
			},
			{
			  "name": "New York",
			  "abbreviation": "NY"
			},
			{
			  "name": "North Carolina",
			  "abbreviation": "NC"
			},
			{
			  "name": "North Dakota",
			  "abbreviation": "ND"
			},
			{
			  "name": "Ohio",
			  "abbreviation": "OH"
			},
			{
			  "name": "Oklahoma",
			  "abbreviation": "OK"
			},
			{
			  "name": "Oregon",
			  "abbreviation": "OR"
			},
			{
			  "name": "Pennsylvania",
			  "abbreviation": "PA"
			},
			{
			  "name": "Rhode Island",
			  "abbreviation": "RI"
			},
			{
			  "name": "South Carolina",
			  "abbreviation": "SC"
			},
			{
			  "name": "South Dakota",
			  "abbreviation": "SD"
			},
			{
			  "name": "Tennessee",
			  "abbreviation": "TN"
			},
			{
			  "name": "Texas",
			  "abbreviation": "TX"
			},
			{
			  "name": "Utah",
			  "abbreviation": "UT"
			},
			{
			  "name": "Vermont",
			  "abbreviation": "VT"
			},
			{
			  "name": "Virginia",
			  "abbreviation": "VA"
			},
			{
			  "name": "Washington",
			  "abbreviation": "WA"
			},
			{
			  "name": "West Virginia",
			  "abbreviation": "WV"
			},
			{
			  "name": "Wisconsin",
			  "abbreviation": "WI"
			},
			{
			  "name": "Wyoming",
			  "abbreviation": "WY"
			}
		];
    
		
			  
	}
	
})();