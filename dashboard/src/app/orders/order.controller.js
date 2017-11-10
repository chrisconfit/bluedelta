'use strict';

angular.module('inspinia')
  .controller('OrdersController', ['$filter','$scope', 'SweetAlert', 'user', 'api', '$stateParams', function ($filter, $scope, SweetAlert, user, api, $stateParams) {

    var vm = this;
    vm.data = api.getData();
    
    vm.user = user.get(true);
    
    vm.userNames = {
	    "8144148a-2ad6-4353-8850-0e1b301fa227" : "Creighton Hardy",
	    "865eda13-2e89-4564-9f7c-0d1accfdcebe":"Dan Terzo",
	    "357bae03-cce3-47ea-8875-3cfddab19e08": "Adam Lewis",
	    "58c978b5-b518-46fc-9276-6e880bd670e3":"Ryan Jetton",
	    "12f1a391-02f3-4aaf-92cc-734ed5f38184" : "Chris LeFevre",
	    "3b9b047a-f148-4f53-9306-bd93139d7b1c": "James Kelleway"
    }
    
    vm.createCard = function(nonce){
		//alert("Let's create a CC!! "+nonce);
		var data = {
			userId:1,
			nonce:nonce
		}

		console.log(data);
		api.call('usersCreateCreditCard', data, function(result){
			console.log("here's the result!");
			console.log(result);
		});
  	}

    function serializeFilters(obj){
	    var result = [];
			for (var property in obj)
				if(!obj[property] || obj[property]=="All" || obj[property]==null || obj[property] =="") continue;
        else result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
			return result.join("&");
    }
    vm.filterOrders = function(){
	    var filters = angular.copy(vm.filters);
	    var range = filters.dateRange;
	    delete filters.dateRange;
	    filters.startDate = range.startDate;
	    filters.endDate = range.endDate;
    }

    
    
    
    
    
    
    
    //Delete Orders
    
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
    };
    
		vm.deleteOrder = function(orderId){
			SweetAlert.swal(deleteOrderBox,
		    function (isConfirm) {
	        if (isConfirm) {
						api.call('ordersDelete', orderId, function(result){
							vm.ordersRemove(orderId);
	          	SweetAlert.swal("Deleted!", "Order# "+orderId+" has been deleted.", "success");
	          });
	        }
		    }
		  );
		};
		
		vm.ordersRemove = function(orderId){
			for(var i=0; i<vm.orders.length; i++){
				if (vm.orders[i].id == orderId){
					vm.orders.splice(i, 1);
					return;
				}
			}
		};
 
 
	
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
		
		
		function pullOrders(filters, callback){
			api.call('ordersList', filters, function(result){
				if (vm.pagination.total == 0 ) vm.pagination.total = Math.ceil(parseInt(result.total)/vm.filters.results_per_page);
				vm.pagination.current = parseInt(result.page);
				vm.orders.push.apply(vm.orders, result.results);
				vm.pagination.loaded++;	
				if (callback) callback();
			});
		}
		
		//Init users
		vm.orders = [];
		vm.filters = {
			"results_per_page" : 25,
			"page": 1, 
			"orderby":"created_at",
			"order":"DESC",
		}
		
		if($stateParams.user_id) vm.filters.user_id=$stateParams.user_id;
		
		
		$scope.$watch(angular.bind(this, function () {
		  return this.filters.id;
		}), function (newVal) {
			if (newVal =="") delete vm.filters.id;
			if (!newVal) return false;	
			var arr = Array.isArray(newVal) ? newVal : newVal.split(',');
			vm.filters.id=arr;
		});
		
		//Date range filter setter
		vm.dateRange = {startDate: null, endDate: null}
		$scope.$watch(angular.bind(this, function () {
		  return this.dateRange;
		}), function (newVal) {
			if (newVal.startDate ==null) delete vm.filters.start_date;
			else vm.filters.start_date = new Date(newVal.startDate);
			if (newVal.endDate ==null) delete vm.filters.end_date;
			else vm.filters.end_date = new Date(newVal.endDate);
		});    	
		
		vm.changeSort = function(col, asc){
	    var direction = asc ? "ASC" : "DESC";
	    vm.filters.orderby=col;
	    vm.filters.order = direction;
			vm.newQuery();
    }
        
    vm.newQuery = function(){
	    vm.pagination.total = 0;
	    vm.orders = [];
	    vm.filters.page=1;
	    for (var i=0; i<vm.filters.length; i++){
		    if (vm.filters[i] == "") delete vm.filters[i];
	    }
	    pullOrders(vm.filters);
    }

		pullOrders(vm.filters);   
					
		vm.formatDate = function(date){
			var date = new Date(date);
			return $filter('date')(date, "MM/dd/yyyy");
		}			
		vm.changePage = function(page){
			vm.filters.page=parseInt(page);
			vm.orders=[];
			pullOrders(vm.filters);
		}
		
		vm.pagination = {
			total:0,
			current:0
		}

		
			

  }]);
