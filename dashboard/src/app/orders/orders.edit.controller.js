'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['$timeout', '$filter', '$q', '$scope', 'orderData', 'toaster', '$uibModal','api', 'user', '$state', 'SweetAlert',
  function ($timeout, $filter, $q, $scope, orderData, toaster, $uibModal, api, user, $state, SweetAlert) {

    var vm = this;
		vm.user = user.get(true);
		$scope.f = {};
		var newOrderData = {
			order_status_id: 6,
			order_items:[{
				gender_option_id:1,
				style_option_id:1,
				top_thread_id:1,
				accent_thread_id:1,
				bottom_thread_id:1,
				fabric_id:1000,
        payment_status_id:1
			}]
		}
		
		vm.newOrder = orderData ? false : true;
		vm.order = vm.newOrder ? newOrderData : orderData;

		vm.originalJean = vm.newOrder ? null : angular.copy(vm.order.order_items[0]);
		vm.order.fit_date =  vm.order.fit_date ? vm.order.fit_date: null;
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
	  vm.data.payment_statuses = [
      {"id":1, "label": "Awaiting Payment"},
      {"id":2, "label": "Paid"},
      {"id":3, "label": "Comped"},
    ];

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
		
		vm.formatDate = function(date){
			var date = new Date(date);
			return $filter('date')(date, "MM/dd/yyyy h:s a");
		}			
		
		$scope.$watch(angular.bind(this, function () {
		  return this.order.fit_date;
		}), function (newVal) {
			if (newVal && newVal._d){
				var d = newVal._d.toISOString().slice(0,10);
				vm.order.fit_date = d;
			}
		});
		
		$scope.$watch(angular.bind(this, function () {
		  return this.order.due_date;
		}), function (newVal) {
			if (newVal && newVal._d){
				var d = newVal._d.toISOString().slice(0,10);
				vm.order.due_date = d;
			}
		});
		
		$scope.$watch(angular.bind(this, function () {
		  return this.order.dob;
		}), function (newVal) {
			if (newVal && newVal._d){
				var d = newVal._d.toISOString().slice(0,10);
				vm.order.dob = d;
			}
		});
		
		
		/*										    				*\
		*									    						*
		*				    											*
		* * * * *  Address Modal 	* * * * * 
		*												    			*	
		\*	  								    				*/
	
	  vm.editAddress = function (type, icon) {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'app/components/address-choice/address.html',
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
	      templateUrl: 'app/components/user-choice/userChoice.html',
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

	  vm.compOrder = function(){
      var order_object = {
        id:vm.order.id,
        payment_status_id:3
      };

      api.call('ordersPost', order_object, function(result){
        console.log(result);
        vm.order.payment_status_id=3;
      });

    }


    /*  	  						    		  		*\
		*								    			  			*
		*				   								 		  	*
		* * * * *  Key In Modal 	* * * * *
		*				  	 					    		  	*
		\*	  							    				  */



    vm.keyinPayment = function(){

      var modalInstance = $uibModal.open({
        templateUrl: 'app/components/key-in-cc/keyInModal.html',
        controller: 'KeyInController',
        resolve: {
          orderData : function() {
            return {
              "user":vm.orderUser,
              "order":vm.order
            };

          },
          api : function(){
						return api;
					},
          confirmation : function(){
            return function(swalSettings){SweetAlert.swal(swalSettings)};
          },
        }
      });
    };

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
		    	user_id:vm.user.id,
	    	}
	    };
			api.call('commentsCreate', data, 
				function(result){
					//Quick fix since this endpoint does not return user name
					result.user={
			    	first_name:vm.user.first_name,
			    	last_name:vm.user.last_name,
		    	}
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
	
	
	
	
		    
    var deleteOrderBox = {
      title: "Are you sure?",
      text: "This order will be deleted forever and you will be redirected to the orders list!",
      type: "warning",
      showCancelButton: true,
			confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true 
    }
   
		vm.deleteThisOrder = function(){
			SweetAlert.swal(deleteOrderBox,
		    function (isConfirm) {
	        if (isConfirm) {
		        api.call('ordersDelete', vm.order.id, function(result){
              $state.transitionTo('orders.list');
	          });
	        }
		    }
		  );
		}
		
		
		
		var reOrderBox = {
      title: "Re-Order this pair of Jeans?",
      text: "If you confirm, this order will be saved and you will be re-directed to your new order",
      type: "warning",
      showCancelButton: true,
			confirmButtonColor: "#34d289",
      confirmButtonText: "Re-Order",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true 
    }
		
		//{"shipping_name":"Chris LeFevre","shipping_phone":"66250210265","shipping_address_id":29,"copy_order_item_id":293,"order_type_id":1}
		vm.reOrder = function(){
			
			SweetAlert.swal(reOrderBox,
		    function (isConfirm) {
	        if (isConfirm) { 
			      var copyOrderObject = {
							"shipping_name":vm.order.shipping_name,
							"shipping_phone":vm.order.shipping_phone,
							"shipping_address_id":vm.order.shipping_address_id,
							"copy_order_item_id":vm.order.order_items[0].id,
							"order_type_id":vm.order.order_type_id,
							"user_id":vm.orderUser.id
						}
						vm.saveOrder(function(){
							api.call('ordersPost', copyOrderObject, function(result){
								$state.transitionTo('orders.edit', {orderId:result.id});
							});
						});
	        }
		    }
			);
	
		}
	  
		
		function jeanHasChanged(){
			var o1 = vm.order.order_items[0];
			var o2 = vm.originalJean;
			return !angular.equals(o1, o2);
		}
		
		vm.saveOrder = function(callback){
			
			if (!$scope.f.orderForm.$valid){
				$scope.f.orderForm.submitted = true;
				return false;
			}  
					
		
			console.log(jeanHasChanged());
			
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
							console.log("new order created!!!");
							console.log(newOrder);
							$state.transitionTo('orders.edit', {orderId:newOrder.id});
						});
	
					});
				
				}
				
				//Update existing order...
				else{
					api.call('ordersPost', vm.order, function(result){
						toaster.clear(savingToast);
						toaster.success('Saved Order!');
						if (callback)callback();						
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
	
	
	
	  var dataParameter = {
    "amount_money": {
      "amount" : "100",
      "currency_code" : "USD"
    },
    "callback_url" : "https://requestb.in/17ok6gh1", // Replace this value with your application's callback URL
    "client_id" : "sq0idp-Ix0BKq70y9xTbYuMuBPZkQ", // Replace this value with your application's ID
    "version": "1.3",
    "notes": "Payment for Order #"+vm.order.id,
    "options" : {
      "supported_tender_types" : ["CREDIT_CARD","CASH","OTHER","SQUARE_GIFT_CARD","CARD_ON_FILE"]
    }
  };
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	var timestamp = Math.floor(Date.now() / 1000);
  vm.squareLink = iOS ? "square-commerce-v1://payment/create?data=" + encodeURIComponent(JSON.stringify(dataParameter)) +"&time="+timestamp : false;

}]);
