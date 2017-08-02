'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['bdAPI', '$scope', 'aws', 'jsonData', 'orderData', 'toaster', '$uibModal', 
  function (bdAPI, $scope, aws, jsonData, orderData, toaster, $uibModal) {

    var vm = this;
    
    vm.user = {
	    "name":"Chris LeFevre"
    }
		
		var newOrderData = {
			fitDate:"",
			dob:"",
			dueDate:""
		}
		var newOrder = orderData.order ? false : true;
		
		vm.order = orderData.order || newOrderData;
		console.log(vm.order);
		vm.order.fitDate =  vm.order.fitDate ? vm.order.fitDate: null;
		vm.order.dob =  vm.order.dob ? vm.order.dob: null;
		vm.order.dueDate =  vm.order.dueDate ? vm.order.dueDate: null;
		vm.orderUser = orderData.user || {};
    
    
    vm.lookup = function(key, value, data){
			for (i=0; i<data.length; i++){
				if (data[i][key]==value) return data[i];	
    	}
    	return false;
    }
    
    vm.style=[
	    {"styleId":1, "label":"Straight"},
	    {"styleId":2, "label":"Skinny"},
	    {"styleId":3, "label":"Bootcut"},
    ]
    
    vm.genders = [
	    {"genderId":1, "label":"Male"},
			{"genderId":2, "label":"Female"},
    ];
    
    vm.status = [
			{"statusId":1, "label":"New"},
			{"statusId":2, "label":"Awaiting Payment"},
			{"statusId":3, "label":"Processing"},
			{"statusId":4, "label":"Shipped"},
			{"statusId":5, "label":"Completed"},
    ];

		vm.orderType = [
			{"typeId":1, "label":"Blue Delta"},
			{"typeId":2, "label":"Vendor Fitted"},
			{"typeId":3, "label":"Cloned from Non-BD Jean"},
			{"typeId":4, "label":"Cloned from BD Jean"},
			{"typeId":5, "label":"Re-Order"},
		];
			
		
    //init json data from route resolve...
    var jd = {};
		for(var i=0; i<jsonData.length; i++){
			var key = jsonData[i].config.url.replace(".json","").replace("http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/", "");
			jd[key] = jsonData[i].data;
		}
		vm.data = jd;
		
		
		vm.timeFromNow = function(timestamp){
			return moment(timestamp).fromNow();
		}
		
		
		vm.timelineForm = {
			message:null
		}
		
		
		vm.jeanEditMode= newOrder ? true : false;
		
		vm.beginJeanEdit = function(){
			console.log("begin");
			vm.jeanEditMode = true;
			vm.jeanBeforeEdit = angular.copy(vm.order.orderItems[0].jean);
		}
		
		vm.clearJeanEdit = function(){
			vm.jeanEditMode = false;
			vm.order.orderItems[0].jean = angular.copy(vm.jeanBeforeEdit);
		}
		
		/*
  		toaster.pop({
			  type: 'wait',
			  title: 'Saving...',
			  showCloseButton: true,
			  timeout: 2000
			});
    
    toaster.pop({
				  type: 'success',
				  title: 'Order Saved',
				  showCloseButton: true,
				  timeout: 3000
				});
				
					toaster.pop({
				  type: 'error',
				  title: 'Could Not Save',
				  body: "err.message",
				  showCloseButton: true,
				  timeout: 7000
				});
				
				*/
		 
	
		
		vm.billingSameAsShipping = function(){
			if (!vm.order.billingAddress || Object.keys(vm.order.billingAddress)<1) vm.order.billingAddress = vm.order.shippingAddress;
			
			return angular.equals(vm.order.billingAddress, vm.order.shippingAddress);
		}

    vm.editAddress = function (type, icon) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/orders/address.html',
        controller: 'AddressController',
        resolve: {
	        data: {
		        addressType : type,
		        icon : icon,
		      },
	        saveOrder : function(){
		        return vm.saveOrder;
	        },
          address: function () {
            return vm.orderUser.address;
          },
          order : function() {
	          return vm.order;
          }
        }
    	});
    };
    
       
    vm.editUser = function(){
	    var modalInstance = $uibModal.open({
        templateUrl: 'app/orders/userChoice.html',
        controller: 'UserChoiceController',
        resolve: {
	        saveOrder : function(){
		        return vm.saveOrder;
	        },
          orderUser : function() {
	          return vm.orderUser;
          },
          order : function() {
	          return vm.order;
          }
        }
    	});
    };

	    
		vm.saveOrder = function(){
		/*	 
			toaster.pop({
			  type: 'wait',
			  title: 'Saving...',
			  showCloseButton: true,
			  timeout: 2000
			});
			*/
			toaster.pop({
			  type: 'wait',
			  title: "Saving...",
			  showCloseButton: true,
			  timeout: 3000
			});
			
			
			console.log("ABOUT TO SAVE");
			console.log(vm.order);
			
			var args = newOrder ? vm.order : [vm.order.orderId, vm.order];
			var saveFunc = newOrder ? 'orderCreate' : 'ordersUpdate';
			var succMessage = newOrder ? "Order Created" : "Order Saved";
			var errMessage = newOrder ? "Could not create" : "Could not Save";	
			
			console.log(saveFunc);
			console.log(args);
			
			bdAPI.call(saveFunc, args, function(result){
				console.log(result);
				toaster.pop({
				  type: 'success',
				  title: succMessage,
				  showCloseButton: true,
				  timeout: 3000
				});
			}, function(){
				toaster.pop({
				  type: 'error',
				  title: errMessage,
				  body: "err.message",
				  showCloseButton: true,
				  timeout: 7000
				});
			});
		}
		
    vm.addTimelineItem = function(){
	    if (!vm.timelineForm.message) return false;
			bdAPI.call('commentsCreate', [vm.order.orderId, {message:vm.timelineForm.message}], 
				function(result){
					console.log("comment created");
					vm.order=result.data;
					vm.timelineForm.message = null;
					$scope.$apply();
				}
			);
    }
    
    
    
    
    /*
$scope.demo1 = function(){
        toaster.success({ body:"Hi, welcome to Inspinia. This is example of Toastr notification box."});
    };

    $scope.demo2 = function(){
        toaster.warning({ title: "Title example", body:"This is example of Toastr notification box."});
    };

    $scope.demo3 = function(){
        toaster.pop({
            type: 'info',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true

        });
    };

    $scope.demo4 = function(){
        toaster.pop({
            type: 'error',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true,
            timeout: 600
        });
    };

*/
		
    
   
		
    

  }]);
