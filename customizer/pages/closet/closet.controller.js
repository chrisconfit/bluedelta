(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean','popups', 'aws', 'bdAPI', '$scope', 'messages', 'loader'];
  function closetCtrl($location, jean, popups, aws, bdAPI, $scope, messages, loader) {
	  

	  loader.show("Getting your profile information...");
	  
    var vm = this;   
		
		popups.closeAll();
		vm.popups=popups.get();

		vm.messages=messages.get();
		
		//Set up Jean
		vm.jean = jean;
		
		vm.data={}//jsonData.getData();
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
			if (vm.user[field] == "") vm.user[field] = null;
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
				
    var cognitoUser = aws.getCurrentUserFromLocalStorage();
    if (cognitoUser){
	    
	    bdAPI.defaultHeaders_['Authorization'] = cognitoUser.idToken.getJwtToken();
	    var idTokenPayload = cognitoUser.idToken.jwtToken.split('.')[1];
			var identityID = JSON.parse(atob(idTokenPayload)).sub;	
			bdAPI.usersGet(identityID).then(
				function(result){
					
					loader.hide();
			
					vm.user = result.data;	
				
					vm.userForm.data = angular.copy(result.data);
					$scope.$apply();					
/*
					vm.user.jeans = [];
					
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
	    	
	    	

	    	
	
				
		/*
		* Password Form
		*/
		vm.passForm = {
			"editing" : false,
			"currentPass" : "",
			"newPass": "",
			"newPassConfirm" : "",
			"clear": function(){
				vm.passForm.editing = false;
				vm.passForm.currentPass = "";
				vm.passForm.newPass = "";
				vm.passForm.newPassConfirm = "";
				messages.reset();
			}
		};
		
		
		function validatePassword(password){
			var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
			return re.test(password);
		}
		
		vm.validatePasswordForm = function(){
		
			if (!validatePassword(vm.passForm.newPass)){
				messages.set("A valid password must: <ul><li>Be between 6 and 50 characters</li><li>Contain at least one number</li><li>Contain at least one uppercase letter</li><li>Contain at least one lowercase letter</li><li>Contain at least one special character (\"!,@,#,$,%,^,&, or *\")</li>");	
			}
			
			if (vm.passForm.newPass !== vm.passForm.newPassConfirm){
				messages.set("New Password and Confirmation do not match", "error");
				return false;
			}
			
			return true;	
		}
		
		
		//Register User

 
    vm.changePassword = function () {
	    messages.reset();
	    if (vm.validatePasswordForm()){
		    
				aws.changePassword(vm.user.email, vm.passForm.currentPass, vm.passForm.newPass).then(
					function(result){
						vm.passForm.clear();
						messages.set("Password successfully changed.", "success");
					},
					function(err){	
						messages.set(err.message, "error");
					}
				);
		  }
    };	
		

		/*
		
		vm.orderJean = function(jeanData){
			vm.jean = jean;
			$location.path('/order/'+jeanData.jeanId+'/'+vm.user.identityId);
		}
*/

		vm.copyJean = function(){
			vm.jean = jean.createNew(vm.displayJean);
			$location.path('/customizer');
		}
		
		vm.displayJean={};
		vm.selectJean = function(jean){
			vm.popups.jeanProfile = true; 
			vm.displayJean.data=jean
		}
		
		
		

		function findJeanbyId(jeanId){
			for (var j=0; j < vm.user.jeans.length; j++) {
	      if (vm.user.jeans[j].jeanId === jeanId) {
	        return {"index": j, "data" : vm.user.jeans[j]};
	      }
      }
  	}

		vm.deleteJean = function(jeanId){
			jean.deleter(vm.user.identityId, jeanId, function(result){
				var index = findJeanbyId(jeanId).index;
				vm.user.jeans.splice(index, 1);
				$scope.$apply();
			});
		}
		
		vm.orderJean = function(jeanData){
			console.log("ordering");
			jean.setup(jeanData);
			//$location.path('/order/'+jeanData.jeanId+'/'+vm.user.identityId);
			$location.path('/order');
		}
	
			


	
		
		//Get User
  }
  



})();