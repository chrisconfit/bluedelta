(function() {
  
  angular
    .module('bdApp')
    .controller('orderCtrl', orderCtrl);

  orderCtrl.$inject = ['$window', '$location', 'jean','popups', '$filter', 'aws', 'bdAPI', '$scope', 'jsonData'];
  function orderCtrl($window, $location, jean, popups, $filter, aws, bdAPI, $scope, jsonData) {
	  

	  
    var vm = this;
    vm.popups=popups.get();
		
		jean.setup();
		vm.jean = jean.get();

		
		var userDetails = aws.getCurrentUserFromLocalStorage();
		var identityId = bdAPI.setupHeaders(userDetails);

		if (vm.jean.jeanId && identityId){
			$location.path('/order/'+vm.jean.jeanId+'/'+identityId);
		}

		vm.orderForm={};
		vm.orderForm.step=1;
		
		vm.order = {
			"userId":identityId,
			"price":null,
			"shippingAddress":null,
			"vendor":null,
			"rep":null,
			"status":"New",
			"orderItems":[{
				"jean":vm.jean,
				"tracking":null,
				"notes":null,
			}],
			"timeline":null,
			"tailor":null,
		}
		
		

		vm.placeOrder = function(){
			console.log("placing order...");

			console.log("order object V");
			console.log(vm.order);
			
			bdAPI.call('orderCreate', vm.order, function(result){
				
				console.log("order created: "+result.data.orderId);
				
				bdAPI.call('commentsCreate', [result.data.orderId, {message:"Order Placed"}], function(result){
					console.log("comment created");
					console.log(result);
				});
			});
		}

					
		vm.chooseFitType = function(type){
			vm.order.orderType = type;
			if (type == 2 && !vm.order.tailor){
				vm.popups.tailors=true;
			}	
		}
		
		vm.data=jsonData;
		
		vm.orderForm.nextStep = function(){
			
			//Step 1 to Step 2
			if (vm.orderForm.step==1){
				
				//Make sure we've got a fit type
				if (!vm.order.orderType){
					return false;
				}
				
				//If we're using a tailor, make sure we've got a tailor
				if (vm.order.orderType ==2 && !vm.order.tailor){
					vm.popups.tailors=true;
					return false;
				}
				
				vm.orderForm.step=2;
				return;
			}
			
		}


/*
		window.onbeforeunload = function() {
		    return 'You have unsaved changes!';
		}
	*/			
		
		
		
		function getPrimaryAddress(addresses){
			for (var i=0; i<addresses.length; i++) {
				if (addresses[i].primary == true) return addresses[i];
			}
			console.log('no address marked as primary... returning first result');
			return addresses[0];
		}
   
    var user = aws.getCurrentUserFromLocalStorage();
		
		
    if (user){
	    var identityID = bdAPI.setupHeaders(user);
			bdAPI.usersGet(identityID).then(
				function(result){
					vm.user = result.data;	
					vm.order.shippingAddress = getPrimaryAddress(vm.user.address);
					$scope.$apply();
				}, 
				function(err){console.log(err)} 
			);
    }else{
	    //redirect if not logged in
	    $location.path('/login');
		}	

		

	


		//Get User
  }
  



})();