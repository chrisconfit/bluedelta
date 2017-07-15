
/*
*
* This controller is designed to be a child of closet.controller. It refernces $scope.$scope.vm.user throughout and needs to inherit $scope.vm.user from a parent
*
*/

(function() {
  
  angular
    .module('bdApp')
    .controller('addFormCtrl', addFormCtrl);

  addFormCtrl.$inject = ['$scope', '$filter', 'bdAPI'];
  function addFormCtrl($scope, $filter, bdAPI) {
	  
	  
	  console.log($scope);
	  console.log(bdAPI);
	  
		$scope.addForm = {};
		$scope.model = {};
		
		var addFormFields = ['addressLine1','addressLine2','city','state','zip'];
		
		
		//Choose Primary Address
		$scope.choosePrimary = function(index){
			for (a = 0; a< $scope.vm.user.address.length; a++){
				$scope.vm.user.address[a].primary = (a == index ? true :false);
			}
			bdAPI.saveUser($scope.vm.user).then(
				function(result){
					console.log('saved');
				}
			);
		}

		$scope.editing = false;		
		
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
			console.log(index);
			$scope.vm.user.address.splice(index, 1);
			console.log($scope.vm.user.address);
		}
	
		
		//Clear Address Form
		$scope.clear = function(){
			
			var dataObj = $scope.editAdd.data;
			
			console.log(dataObj);
			if (dataObj == null){
				console.log("removing");
				removeAddress($scope.editAdd.index);//Remove Address
			}
			else{
				$scope.vm.user.address[$scope.editAdd.index] = $scope.editAdd.data;//Reset Address
			}
			
			resetForm();			

		}
		
		
		//Remove Address and save user
		$scope.remove = function(index){
			var wasPrimary = $scope.vm.user.address[index].primary;	
			$scope.vm.user.address.splice(index, 1);
			if(wasPrimary) $scope.choosePrimary(0);
			bdAPI.saveUser($scope.vm.user);
		}
		
		//Save Form
		$scope.save = function(){
			bdAPI.saveUser($scope.vm.user).then(
				function(result){
					$scope.newAdd = null;
					$scope.active = false;
					$scope.model = {};
					$scope.$apply();
				}
			);
			
			
		}
		
			  
	}
	
})();