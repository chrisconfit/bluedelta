'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['$timeout', '$filter', '$q', '$scope', 'orderData', 'toaster', '$uibModal','api', 'user', '$state',
  function ($timeout, $filter, $q, $scope, orderData, toaster, $uibModal, api, user, $state) {

    var vm = this;
		vm.user = user.get();
		var newOrderData = {
			order_items:[{
				gender_option_id:1,
				style_option_id:1,
				top_thread_id:1,
				accent_thread_id:1,
				bottom_thread_id:1,
				fabric_id:1000
			}]
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
		vm.data = api.getData();
	
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
		    if (primary){
					vm.order.address = primary;
					vm.order.shipping_address_id=primary.id;
				}
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
		
		vm.saveOrder = function(){
			
			if(vm.orderUser==null){
				console.log("We don't have a user yet!");
				return false;
			}
			//toaster.wait('Saving Order...');
			
			var savingToast = toaster.pop({
			  type: 'wait',
			  title: "Saving...",
			  timeout: 9000000
			});			

			var jeanData = vm.order.order_items[0];
			var filename = api.getDataCode(jeanData);
			filename += ".jpg";
			jeanData.image = {filename:filename};
			api.createThumb(jeanData).then(function(blob){	
				console.log(blob);
				if (!blob){
					delete jeanData.image;
					jeanData.jean_image_url = "https://s3.amazonaws.com/bluedelta-customizer/images/thumbnails/default.jpg";
				}else{
					jeanData.image.data = blob;
				}

				
				//Save new order...
				if (vm.newOrder){
					var data = {userId:vm.orderUser.id, jean:jeanData};
					console.log("We've created the thumbnail... now creating the jean...");
					console.log(data);
					
					//1. Create jean
					api.call('usersCreateJean', data, function(newJean){
						toaster.clear(savingToast);
						toaster.pop({
						  type: 'success',
						  title: "Order Saved!",
						  timeout: 2000
						});			
					
						//2. Create Order
						var orderData = vm.order;
						orderData.user_id = vm.orderUser.id,
						orderData.shipping_name = vm.orderUser.first_name+" "+vm.orderUser.last_name,
						orderData.shipping_address_id = vm.order.shipping_address_id,
						orderData.jean_id = newJean.id
						
						api.call('ordersPost', orderData, function(newOrder){
							$state.transitionTo('orders.edit', {orderId:newOrder.id});
						});
	
					});
				
				}
				
				//Update existing order...
				else{
					console.log("updating existing...");
					
					api.call('ordersPost', vm.order, function(result){
						console.log("order saved!");
						console.log(result.order_items[0].fabric_id);
						
						toaster.clear(savingToast);
						toaster.success('Saved Order!');
						vm.order.order_items[0] = result.order_items[0];
					}, function(err){
						toaster.clear(savingToast);
						toaster.pop({
						  type: 'error',
						  title: "Problem saving order..",
						  timeout: 2000
						});	
					});
				}			
				
			});

	
		}//.saveOrder()...
	

}]);
