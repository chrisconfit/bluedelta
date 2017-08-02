'use strict';

angular.module('inspinia')
  .controller('OrdersController', ['bdAPI', '$scope', 'aws', 'SweetAlert', function (bdAPI, $scope, aws, SweetAlert) {


		console.log(bdAPI);
		
		
		
		
		

    var vm = this;
    
    
    
    vm.userNames = {
	    "357bae03-cce3-47ea-8875-3cfddab19e08": "Adam Lewis",
	    "58c978b5-b518-46fc-9276-6e880bd670e3":"Ryan Jetton",
	    "12f1a391-02f3-4aaf-92cc-734ed5f38184" : "Chris LeFevre"
    }
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
		vm.pagination = {
			ordersPerPage:20,
			prev:false,
			next:false,
			nextURL:"",
			page:1,
			loaded:0
		};
		vm.pagination.startIndex = (vm.pagination.page-1)*vm.pagination.ordersPerPage;
		
		vm.findIndex = function(orderId){
	    for(var i = 0; i < vm.orders.length; i++) {
	      if(vm.orders[i].orderId === orderId) return i;
	    }
	    return -1;
		}
		
		function incrementPage(inc){
			vm.pagination.page = vm.pagination.page+inc;
			vm.pagination.startIndex = (vm.pagination.page-1)*vm.pagination.ordersPerPage;
			if (inc > 0) vm.pagination.prev=true;
			else vm.pagination.next=true;
		}
		
		
		vm.pagination.changePage = function(dir){
			
			if (vm.pagination.page == 1 && dir=="prev") return false;
			if (vm.pagination.page == 2 && dir=="prev") vm.pagination.prev=false;
			
			//put in rules for the last page
			
			if (dir =="next"){
				if (vm.pagination.page < vm.pagination.loaded) incrementPage(1);
				else{
					pullOrders(function(){
						incrementPage(1);
					})
				}
			}else{
				incrementPage(-1);				
			}	
		}
		
		

		function pullOrders(callback){
			var args = vm.pagination.nextURL ? [vm.pagination.ordersPerPage, vm.pagination.nextURL] : vm.pagination.ordersPerPage;
			bdAPI.call('ordersList', args, function(result){
				console.log(result);
				vm.orders.push.apply(vm.orders, result.data.items);
				if (result.data.next){
					vm.pagination.nextURL=result.data.next;
					vm.pagination.next = true;
				}
				else vm.pagination.next = false;
				vm.pagination.loaded++;	
				if (callback){
				 callback();
				}
				$scope.$apply();
			});
		}
		
		//Init orders
		vm.orders = [];
		pullOrders();

		
	
			
		

  }]);
