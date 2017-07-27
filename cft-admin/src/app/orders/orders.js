'use strict';

angular.module('inspinia')
  .controller('OrdersController', ['bdAPI', '$scope', 'aws', 'DTColumnDefBuilder', 'SweetAlert', function (bdAPI, $scope, aws, DTColumnDefBuilder, SweetAlert) {


		console.log(bdAPI);

	
    var vm = this;
    
    var deleteOrderBox = {
      title: "Are you sure?",
      text: "This order will be deleted forever!",
      type: "warning",
      showCancelButton: true,
			confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      closeOnConfirm: false,
      closeOnCancel: true 
    }
    
    
		vm.deleteOrder = function(orderId){
			SweetAlert.swal(deleteOrderBox,
		    function (isConfirm) {
	        if (isConfirm) {
		        bdAPI.setupHeaders();
						bdAPI.ordersDelete(orderId).then(function(result){
							vm.ordersRemove(orderId);
	          	SweetAlert.swal("Deleted!", "Order# "+orderId+" has been deleted.", "success");
	          });
	        }
		    }
		  );
		}

 
 
 
		vm.ordersRemove = function(orderId){
			for(var i=0; i<vm.orders.length; i++){
				if (vm.orders[i].orderId == orderId){
					vm.orders.splice(i, 1);
					return;
				}
			}
		}
 
 
	
		//Get orders
		bdAPI.setupHeaders();
		bdAPI.ordersList().then(
			function(result){
				console.log(result);
				vm.orders = result.data.items;
				$scope.$apply();
			}, 
			function(err){console.log(err)} 
		);
					
				
			
		

  }]);
