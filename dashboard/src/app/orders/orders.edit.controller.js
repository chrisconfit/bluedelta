'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['$filter', '$q', 'bdAPI', '$scope', 'aws', 'orderData', 'toaster', '$uibModal','api', 'appData', 'user',
  function ($filter, $q, bdAPI, $scope, aws, orderData, toaster, $uibModal, api, appData, user) {

    var vm = this;
		vm.user = user.get();
		var newOrderData = {
			fitDate:"",
			dob:"",
			dueDate:"",
			order_items:[
				{
					jean:{
						measurement:{}
					}
				}
			]
		}
		
		vm.newOrder = orderData ? false : true;
		vm.order = vm.newOrder ? newOrderData : orderData;
		console.log(vm.order);
		vm.originalJean = vm.newOrder ? null : angular.copy(vm.order.order_items[0]);
		vm.order.fitDate =  vm.order.fitDate ? vm.order.fitDate: null;
		vm.order.dob =  vm.order.dob ? vm.order.dob: null;
		vm.order.dueDate =  vm.order.dueDate ? vm.order.dueDate: null;
		vm.orderUser = vm.newOrder ? null : orderData.user;
    
    vm.convertToCurrency = function(){
	    price = vm.order.price.replace("$","");
	    var price = $filter('currency')(price, "");
	    if(!price) price = "Please enter a valid price";
			vm.order.price = price
  	};
    
		//Set up app data...    
		vm.data = appData;
	
		//Edit Jean details...
		vm.EditMode= vm.newOrder ? true : false;
		vm.beginJeanEdit = function(){
			vm.EditMode = true;
			vm.BeforeEdit = angular.copy(vm.order.order_items[0]);
		}
		vm.clearJeanEdit = function(){
			vm.EditMode = false;
			vm.order.order_items[0] = angular.copy(vm.BeforeEdit);
		}
		
		/*
		vm.billingSameAsShipping = function(){
			if (!vm.order.billingAddress || Object.keys(vm.order.billingAddress)<1) vm.order.billingAddress = vm.order.shippingAddress;
			return angular.equals(vm.order.billingAddress, vm.order.shippingAddress);
		}
		*/
		
		
		
		
	/*										    				*\
	*									    						*
	*				    											*
	* * * * *  Address Modal 	* * * * * 
	*												    			*	
	\*	  								    				*/

  vm.editAddress = function (type, icon) {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/address-choice/address.html',
      controller: 'AddressController',
      resolve: {
        data: {
	        addressType : type,
	        icon : icon,
	        selected:vm.order.shipping_address_id
	      },
        save : function(){
	        return vm.saveAddress;
        },
        address: function () {
          return vm.orderUser.addresses;
        }
      }
  	});
  };
  
  
  vm.saveAddress = function(add, callback){
	  
	  console.log( "SAVING ADDRESS!!");
	  console.log(add);
	  
    if (add === parseInt(add, 10)){
	    vm.order.shipping_address_id = add;
	    for (var i=0; i<vm.orderUser.addresses.length; i++){
		  	var thisAdd = vm.orderUser.addresses[i];
		  	if (thisAdd.id == add) vm.order.address=thisAdd;
	    }
	    if(callback)callback();
    }
		else{
			var data = {userId:vm.orderUser.id, address:add};
			api.call('postAddress', data, function(result){
				vm.orderUser.addresses.push(result);
				vm.order.address=result;
		    vm.order.shipping_address_id = result.id;
		    if(callback)callback();
			});
		}
  }
    
    
    
  /*  	  						    				*\
	*								    						*
	*				   											*
	* * * * *  User Modal 	* * * * * 
	*				  	 					    			*	
	\*	  							    				*/
     
  vm.editUser = function(){
    var modalInstance = $uibModal.open({
      templateUrl: 'app/orders/userChoice.html',
      controller: 'UserChoiceController',
      resolve: {
        choose : function(){
	        return vm.chooseClient;
        },
        orderUser : function() {
          return vm.orderUser;
        },
        api : function() {
          return api;
        }
      }
  	});
  };
  
  function getPrimaryAddress(addresses){
		if(!addresses || !addresses.length) return false;
		for (var i=0; i<addresses.length; i++) {
			if (addresses[i].primary == true) return addresses[i];
		}
	}
				
  vm.chooseClient = function(client){
		api.call('userGet', client.id, function(result){
			console.log('got users!');
			console.log(result);
	    vm.orderUser = result;
	    var primary = getPrimaryAddress(result.addresses);
	    console.log('prim');
	    console.log(primary);
			vm.order.address = primary;
			vm.order.shipping_address_id=result.id;
    });
  }

    
    
  /*														*\
	*															*
	*															*
	* * * * *  Timeline 	* * * * * 
	*															*	
	\*	  												*/
	
	//Create the "Time from now" text...
	vm.timeFromNow = function(timestamp){
		return moment(timestamp).fromNow();
	}	
	
	//Object 
	vm.timelineForm = {
		message:null
	}
	
  //Init timeline with created_at date.
  vm.timeline = [{message:"Order Created", created_at:vm.order.created_at}]
	vm.timeline.push.apply(vm.timeline, vm.order.order_comments);	
	
	//Function to add timeline item
  vm.addTimelineItem = function(){
	  console.log(user);
    if (!vm.timelineForm.message) return false;
    var data = {
	    orderId:vm.order.id, 
	    comment:{
	    	message:vm.timelineForm.message,
	    	user_id:vm.user.id
    	}
    };
		api.call('commentsCreate', data, 
			function(result){
				console.log("comment created");
				vm.timeline.push(result);
				vm.timelineForm.message = null;
			}
		);
  }
    
    
    





	/*														*\
	*															*
	*															*
	* * * * * Save/Create	* * * * * 
	*															*	
	\*	  												*/	



  
	
	function jeanHasChanged(){
		var o1 = vm.order.order_items[0];
		var o2 = vm.originalJean;
		return !angular.equals(o1, o2);
	}
	
	function runSaveFunc(){
		//var args = vm.newOrder ? vm.order : [vm.order.orderId, vm.order];
		var saveFunc = vm.newOrder ? 'orderCreate' : 'ordersUpdate';
		var succMessage = vm.newOrder ? "Order Created" : "Order Saved";
		var errMessage = vm.newOrder ? "Could not create" : "Could not Save";	
		
		api.call('postAddress', vm.order, 
		//Success
		function(result){
			toaster.pop({
			  type: 'success',
			  title: succMessage,
			  showCloseButton: true,
			  timeout: 3000
			});
			if (vm.newOrder){
				console.log("new order has been created!!!");
				console.log(result);
			}
		},
		//Failure
		function(){
			toaster.pop({
				type: 'error',
				title: errMessage,
				body: "err.message",
				showCloseButton: true,
				timeout: 7000
			});
		});	
	}


	vm.saveOrder = function(){
		
		toaster.pop({
		  type: 'wait',
		  title: "Saving...",
		  showCloseButton: true,
		  timeout: 3000
		});
		
		
		var jeanData = vm.order.order_items[0];
		var filename = api.getDataCode(jeanData);
		filename += ".jpg";
		jeanData.image = {filename:filename};
		api.createThumb(jeanData).then(function(blob){			
			jeanData.image.data = blob;
			api.call('ordersPost', vm.order, function(result){
				console.log(result);
			});
		});
	
		

		
				/*
				var userData = aws.getCurrentUserFromLocalStorage();
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(function(result){
						vm.order.order_items[0].imageURL = result;
						runSaveFunc();
					});
				}
				
			});	
		}else{
			runSaveFunc();
		}
		
		
//			var defer = $q.defer();
/*
	
	var jean = vm.order.order_items[0];
	var filename = getDataCode(jean);
	filename += ".jpg";

		createThumb(jean).then( function(imageURL){
			var userData = aws.getCurrentUserFromLocalStorage();
//			var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
	//		var identityID = JSON.parse(atob(idTokenPayload)).sub;

			if (userData){		
				aws.saveImageTos3(imageURL, userData, filename).then(function(result){
					console.log(result);
				});
			}
			
		});
			/*
		    var userData = aws.getCurrentUserFromLocalStorage();
				bdAPI.defaultHeaders_['Authorization'] = userData.idToken.getJwtToken();
				var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
				var identityID = JSON.parse(atob(idTokenPayload)).sub;	
				
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(
						function(result){	
							//Add image to jean before saving...
				  		jean.set("imageURL",result);
							if (jeanDataId){
								//Update existing Jean...

								bdAPIsUpdate(identityID, jeanDataId, jeanData).then(
									function(result){
										defer.resolve(result);
									},
									function(err){
										console.log(err);
										defer.reject(err);
									}
								);
							}else{
								//Create New Jean...
								bdAPIsCreate(identityID, jeanData).then(

									function(result){
										//Add new id to jean
										jean.set("jeanId", result.dataId);
										defer.resolve(result);
									},
									function(err){
										defer.reject(err);
									}
								);
							}
							
				  	}, function(err){
					  	console.log(err);
					  	defer.reject(err.message);
					  }
					);
				}else{
					defer.reject("You are not logged in...");
				}
				
				
	    });
			
			return defer.promise;
			
*/
		}

		
    

  }]);
