'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['bdAPI', '$scope', 'aws', 'DTColumnDefBuilder', 'jsonData', 'orderData', 'toaster', '$uibModal', 
  function (bdAPI, $scope, aws, DTColumnDefBuilder, jsonData, orderData, toaster, $uibModal) {

    var vm = this;
    
    vm.user = {
	    "name":"Chris LeFevre"
    }
 
		vm.order = orderData.order;
		vm.order.fitDate =  vm.order.fitDate ? vm.order.fitDate: null;
		vm.order.dob =  vm.order.dob ? vm.order.dob: null;
		vm.order.dueDate =  vm.order.dueDate ? vm.order.dueDate: null;
		
		vm.orderUser = orderData.user;
    
    //init json data from route resolve...
    var jd = {};
		for(var i=0; i<jsonData.length; i++){
			var key = jsonData[i].config.url.replace(".json","").replace("/assets/data/", "");
			jd[key] = jsonData[i].data;
		}
		vm.data = jd;
		
		
		vm.timeFromNow = function(timestamp){
			return moment(timestamp).fromNow();
		}
		
		
		vm.timelineForm = {
			message:null
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
		
		
		console.log(getCurrentUserFromLocalStorage());
    vm.editAddress = function () {
      var modalInstance = $uibModal.open({
          templateUrl: 'app/orders/address.html',
          controller: 'AddressController',
	        resolve: {
	            address: function () {
	                return vm.orderUser.address;
	            },
	            order : function() {
		            return vm.order;
	            }
	        }
      });
    };

      
    
    
    
		vm.saveOrder = function(){
			console.log("saving...");
			bdAPI.setupHeaders();
			//Log order id and order details
			console.log(vm.order.orderId, vm.order);
			
			bdAPI.ordersUpdate(vm.order.orderId, vm.order).then(function(result){
				//Log Result
				console.log("RESULT");
				console.log(result);	
			},
			function(err){
				console.log(err);
			});
		
		}
		
    vm.addTimelineItem = function(){
	    if (!vm.timelineForm.message) return false;
	    var d = new Date();
	    if (!vm.order.timeline) vm.order.timeline = [];
	    vm.order.timeline.push(
		    {
			    "message":vm.timelineForm.message,
			    "timestamp":d.toISOString(),
			    "user": vm.user.name
		    }
	    )
	    vm.saveOrder();
	    vm.timelineForm.message = null;
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
