(function() {
  
  angular
    .module('bdApp')
    .controller('orderCtrl', orderCtrl);

  orderCtrl.$inject = ['$window', '$location', 'jean','popups', '$filter', '$routeParams', 'user', 'api', '$scope', 'apiData', '$http'];
  function orderCtrl($window, $location, jean, popups, $filter, $routeParams, user, api, $scope, apiData, $http) {
	  
    var vm = this;
    vm.popups=popups.get();
    vm.tailors = apiData.tailors;

		function getPrimaryAddress(addresses){
			if(!addresses || !addresses.length) return false;
			for (var i=0; i<addresses.length; i++) {
				if (addresses[i].primary == true) return addresses[i].id;
			}
			return addresses[0].id;
		}

		vm.orderCreateObj = {}
		vm.user = {};
		vm.user = user.get();		
		$scope.$watch('vm.user', function(newV) {
			vm.orderCreateObj.shipping_name = newV.first_name+" "+newV.last_name;
			vm.orderCreateObj.shipping_phone = newV.phone;
			vm.orderCreateObj.shipping_address_id = getPrimaryAddress(newV.addresses);
    }, true);

		//Get user's orders
		vm.orders = [];
		api.call('getMyOrders', null, function(result){
			vm.orders = result;
		});
		
		var jeanId;
		
		if ($routeParams.jeanId && $routeParams.action == 'copy'){
			
			$scope.$watch('vm.orders', function(orders) {
				if (orders.length);
				for(i=0; i<orders.length; i++){
					if(orders[i].id == $routeParams.jeanId){
						var urlOrder = orders[i];
						vm.orderCreateObj.copy_order_item_id = urlOrder.order_items[0].id;
						vm.jeanData = urlOrder.order_items[0];
						vm.jeanData.image_url =	vm.jeanData.jean_image_url;
						vm.jeanData.name =	vm.jeanData.jean_name;
					}					
				}
	    }, true);

			
		}
		
		else if ($routeParams.jeanId && !$routeParams.action){	
			jean.setup($routeParams.jeanId, false).then(function(result){
				vm.jeanData=jean.get();	
				vm.orderCreateObj.jean_id = vm.jeanData.id;
			});
		}
		vm.lookup = apiData.lookup;

		vm.orderForm={};
		vm.orderForm.step=1;


		vm.goToCloset = function(){ $location.path('/closet'); }
		vm.startOver = function(){ 
			jean.reset();
			$location.path('/customizer'); 
		}		
		vm.placeOrder = function(){
			api.call('placeMyOrder', vm.orderCreateObj, function(result){
				vm.popups.orderPlaced=true;
			});
		}

		vm.chooseOrderType = function(type, copyItem){
			
			vm.orderCreateObj.order_type_id = type;
			if (type == 2 && !vm.orderCreateObj.tailor_id){
				vm.popups.tailors=true;
			}
			
			//Set order_item_copy
			if(type == 4){
				vm.orderCreateObj.copy_order_item_id = copyItem.id;
				vm.copyItem = copyItem;
			}
			else{
				if($routeParams.action != 'copy') delete vm.orderCreateObj.copy_order_item_id;	
				vm.copyItem = {};
			}
		}
		
		vm.measurementKeys = [
			"waist",
			"seat_down",
			"seat_right",
			"rise",
			"full_rise",
			"thigh_upper_down",
			"thigh_upper_right",
			"thigh_middle_down",
			"thigh_middle_right",
			"thigh_lower_down",
			"thigh_lower_right",
			"outseam",
			"knee_up",
			"knee_right", 
			"calf_up",
			"calf_right",
			"leg_opening"
		];
		
		vm.hasMeasurements = function(order) {

			if (!order || !order.order_items.length ) return false;
			
			var orderItem = order.order_items[0];
			var testCols = [
				'outseam',
				'waist',
				'rise'
			];
			var measurements = true;
			for (i=0;i<testCols.length; i++){
				if (orderItem[testCols[i]] == "" || orderItem[testCols[i]] == null){
					measurements = false;
					break;
				}
			}
			
			return measurements;

		};
		
		vm.orderForm.nextStep = function(){
			//Step 1 to Step 2
			if (vm.orderForm.step==1){
				//Make sure we've got a fit type
				if (!vm.orderCreateObj.order_type_id){ return false; }
				//If we're using a tailor, make sure we've got a tailor
				if (vm.orderCreateObj.order_type_id ==2 && !vm.orderCreateObj.tailor_id){
					vm.popups.tailors=true;
					return false;
				}	
				vm.orderForm.step=2;
				return;
			}	
		}

		vm.editData = {};
		
		vm.editField = function(field){
			var editText = vm.orderCreateObj[field] || " ";
			vm.editData[field] = angular.copy(editText);
		}
		
		vm.revertField = function(field){
			vm.orderCreateObj[field] = angular.copy(vm.editData[field]);
			vm.editData[field] = false;	
		}
		
		

  }
  



})();