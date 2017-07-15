(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean','popups', 'aws', 'bdAPI', '$scope', 'jsonData', 'messages', 'loader'];
  function closetCtrl($location, jean, popups, aws, bdAPI, $scope, jsonData, messages, loader) {
	  

	  loader.show("Getting your profile information...");
	  
    var vm = this;   
		
		popups.closeAll();
		vm.popups=popups.get();

		vm.messages=messages.get();
		
		//Set up Jean
		vm.jean = jean;
		
		vm.data=jsonData.getData();
		vm.jeans = vm.data.jeansList;
		

		vm.onload=function(){
			$scope.vm = vm;	
		}
		
		
		//Edit User
		vm.userForm = {};
		vm.userForm.editing={};
		vm.userForm.saving={};
		vm.userForm.feedback={
			"type":"",
			"message":"",
		}
		

		vm.userForm.cancel = function(field){
			console.log(field);
			vm.userForm.editing[field] = false;
			vm.user[field] = vm.userForm.data[field];
		}
		
		
		//Validation functions
		function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
		}
		
		function validatePhoneNumber(inputtxt) {
		  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
		  return inputtxt.match(phoneno);
		}
		
		vm.userForm.validate = function(field, data){
			
			if (field == 'email'){
				if (validateEmail(data)) return true;
				else {
					messages.set("Please enter a valid email address", "error");
					return false;
				}
			}
			
			else if (field == 'phoneNumber'){
				if (validatePhoneNumber(data)) return true;
				else {
					messages.set("Please enter a valid phone number", "error");
					return false;
				}
			}
			
			else return true;
		}
		
		
		
		vm.userForm.save = function(field){
			
			if (vm.userForm.validate(field, vm.user[field])){
				vm.userForm.saving[field] = true;
				bdAPI.usersUpdate(vm.user.identityId, vm.user).then(
					function(result){
						vm.userForm.saving[field] = false;
						vm.userForm.editing[field] = false;
						vm.userForm.data[field] = vm.user[field];
						$scope.$apply();
					},
					function(err){
						console.log(err);
					}	
				)	
			}
		}
				
    var user = aws.getCurrentUserFromLocalStorage();
    if (user){
	    bdAPI.defaultHeaders_['Authorization'] = user.idToken.getJwtToken();
	    var idTokenPayload = user.idToken.jwtToken.split('.')[1];
			var userID = JSON.parse(atob(idTokenPayload)).sub;	
			bdAPI.usersGet(userID).then(
				function(result){
					
					loader.hide();
			
					vm.user = result.data;	
					console.log(vm.user);
					vm.userForm.data = angular.copy(result.data);
					$scope.$apply();
/*					
					console.log(vm.user);
					vm.user.name = "Chris LeFevre";
					
					console.log(vm.data.jeansList);
					
					
					
					bdAPI.usersUpdate(vm.user.identityId, vm.user).then(function(res){
						console.log("updated...");
						console.log(res);
					})
					*/
					
				}, 
				function(err){console.log(err)} 
			);
    }else{
	    $location.path('/');
		}
	    	
	    	

	    	
	
				
		var logError = function(err){console.log(err)};
		
		
		
		


		vm.copyJean = function(){
			vm.jean = jean.createNew(vm.displayJean);
			$location.path('/customizer');
		}
		
		vm.displayJean={};
		vm.selectJean = function(jean){
			vm.popups.jeanProfile = true; 
			vm.displayJean.data=jean
		}
		
		
		
	
			


	
		
		//Get User
  }
  



})();