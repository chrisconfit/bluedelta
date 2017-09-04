(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', '$window', 'jean','popups', '$scope', 'messages', 'loader', 'user', 'api', 'apiData', '$routeParams'];
  function closetCtrl($location, $window, jean, popups, $scope, messages, loader, user, api, apiData, $routeParams) {
	    
    var vm = this;   
		
		popups.closeAll();
		vm.popups=popups.get();

		vm.messages=messages.get();
		vm.data = apiData;
		//Set up Jean
		vm.jeans;
		api.call('getMyJeans', null, function(results){
			vm.jeans = results;
		});
		
		//Set up orders
		vm.orders = [];		
    api.call('getMyOrders', {}, function(result){
	    vm.orders = result;
    });
    
		vm.data=apiData;//jsonData.getData();
		//vm.jeans = vm.data.jeansList;
		
		
		vm.onload=function(){
			$scope.vm = vm;	
		}
		
		//Edit User
		vm.userForm = {};
		vm.userForm.editing={};
		vm.userForm.saving={};
		vm.userForm.data = {};
		vm.userForm.feedback={
			"type":"",
			"message":"",
		}
		

		vm.userForm.cancel = function(field){
			vm.userForm.editing[field] = false;
			vm.user[field] = vm.userForm.data[field];
		};
		
		vm.userForm.editField = function(field){
			vm.userForm.data[field] = angular.copy(vm.user[field]);
			vm.userForm.editing[field]=true;
			
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
			//if (vm.user[field] == "") vm.user[field] = null;
			if (vm.userForm.validate(field, vm.user[field])){
				console.log(vm.user);
				user.update(vm.user, function(result){
					vm.userForm.saving[field] = false;
					vm.userForm.editing[field] = false;
					//vm.userForm.data[field] = vm.user[field];
				});
			}
		}
		

    
   	
    
    //Get user details and orders...
 //     var identityID = aws.getCurrentIdentityId();
 /*
    if (!identityID){ $location.path('/'); }
	  else{
			
	  	//Todo: Just get orders for user...
			bdAPI.call('ordersList', 100, function(result){
				vm.orders=result.data.items;
			});	
				
			bdAPI.call('usersGet', identityID, function(result){
				loader.hide();
				//vm.user = result.data;							
				vm.userForm.data = angular.copy(result.data);	
			});
			
			vm.user = user.get();
			
    }
	    	*/
	    vm.user = user.get();	

	    	
				
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
		
		
    vm.changePassword = function () {
	    messages.reset();
	    if (vm.validatePasswordForm()){
		    var passwordData ={
			    id:vm.user.id,
			    password:vm.passForm.newPass,
			    old_password:vm.passForm.currentPass
			  }
				user.update(passwordData, function(result){
					vm.passForm.clear();
					messages.set("Password successfully changed.", "success");
				},
				function(err){	
					messages.set(err.message, "error");
				});
		  }
    };	
		





		vm.copyJean = function(jeanId){
			vm.jean = jean.createNew(vm.displayJean);
			$location.path('/customizer/'+jeanId+'/copy');
		}
		
		vm.displayJean={};
		vm.selectJean = function(jean){
			vm.popups.jeanProfile = true; 
			vm.displayJean=jean
		}
		
		vm.selectOrder = function(order){
			console.log("selecting Order");
			console.log(order);
			vm.popups.orderProfile = true; 
			vm.displayOrder=order;
			vm.displayJean = order.order_items[0];
			console.log(vm.displayOrder);	
		}
		
	
		function findJeanbyId(jeanId){
			for (var j=0; j < vm.jeans.length; j++) {
	      if (vm.jeans[j].id === jeanId) return j;
      }
  	}

		vm.deleteJean = function(jeanId){
			api.call('deleteMyJean', jeanId, function(result){
				console.log(result);
				var index = findJeanbyId(jeanId);
				vm.jeans.splice(index, 1);
			});
		}
		
		vm.orderJean = function(jeanId){
			console.log("going to order");
			$location.path('/order/'+jeanId);
		}
	
			


	
		
		//Get User
  }
  



})();