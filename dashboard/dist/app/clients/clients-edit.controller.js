'use strict';

angular.module('inspinia')
  .controller('ClientsEditController',  ['$uibModal', 'userData', 'appData', '$scope', 'api', 'SweetAlert', 'toaster', '$state',
  function ($uibModal, userData, appData, $scope, api, SweetAlert, toaster, $state) {

    
    
    
    var vm = this;
    
    //Setup
		vm.userData = userData;
		vm.appData = appData;
		
		var defaultUser = {
			first_name:"",
			last_name:"",
			email:"",
			phone:"",
			addresses:[],
		}
		

		vm.newUser = Object.keys(vm.userData).length>0 ? false : true;
		vm.userData = vm.newUser ? defaultUser : userData;		
		vm.originalUser = vm.newUser ? null : angular.copy(userData);
		vm.clientEditMode= vm.newUser ? true : false;
		
		vm.beginClientEdit = function(){
			vm.clientEditMode = true;
		}
		
		vm.clearClientEdit = function(item){
			vm.clientEditMode = false;
			item = vm.originalUser;
		}
	
		vm.editAddress = function (type, icon) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/address-choice/address.html',
        controller: 'AddressController',
        resolve: {
	        data: {
		        addressType : type,
		        icon : icon,
		      },
	        save : function(){
		        return vm.saveAddress;
	        },
          address: function () {
            return vm.userData.addresses;
          },
          order : function() {
	          return {};
          }
        }
    	});
    };
    
    function setPrimary(primaryId){
	    for (var i=0; i<vm.userData.addresses.length; i++){
		  	var thisAdd = vm.userData.addresses[i];
		  	if (thisAdd.id == primaryId) thisAdd.primary=1;
		  	else thisAdd.primary=0;
	    }
    }
   
	  vm.saveAddress = function(add, callback){		
			add.primary=1;
			var data = {userId:vm.userData.id, address:add};
			var creatingNew = add.newAdd;
			api.call('postAddress', data, function(result){	
				if(creatingNew) vm.userData.addresses.push(result);
				setPrimary(result.id);
		    if(callback)callback();
			});		
		}
  
 
	


	/*														*\
	*															*
	*															*
	* * * * * Save/Create	* * * * * 
	*															*	
	\*	  												*/	
	vm.saveUser = function(){
		
		toaster.pop({
		  type: 'wait',
		  title: "Saving...",
		  showCloseButton: true,
		  timeout: 3000
		});
			
		var args = vm.userData;
		var succMessage = vm.newUser ? "User Created" : "User Saved";
		var errMessage = vm.newUser ? "Could not create user" : "Could not Save user";	
		
		console.log('about to post!');
		
		api.call('usersPost', args, function(result){
			vm.clientEditMode=false
			toaster.pop({
			  type: 'success',
			  title: succMessage,
			  showCloseButton: true,
			  timeout: 3000
			});
			
			if(vm.newUser) $state.transitionTo('clients.edit', {clientId:result.id});
					
		}, function(err){
			toaster.pop({
			  type: 'error',
			  title: errMessage,
			  body: err.message,
			  showCloseButton: true,
			  timeout: 7000
			});
		});

	}

		
		
		
  }]);
