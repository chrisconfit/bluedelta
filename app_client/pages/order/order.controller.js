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
		console.log(vm.jean);
		
		var userDetails = aws.getCurrentUserFromLocalStorage();
		var identityId = bdAPI.setupHeaders(userDetails);
		console.log("jean is set up");
		console.log(vm.jean.jeanId);
		console.log(identityId);
		if (vm.jean.jeanId && identityId){
			console.log("hm..")
			$location.path('/order/'+vm.jean.jeanId+'/'+identityId);
		}

		
		vm.orderForm={};
		vm.orderForm.step=1;
		
		vm.orderForm.data = {}
		
		vm.chooseFitType = function(type){
			vm.orderForm.data.fitType = type;
			if (type == 2 && !vm.orderForm.data.tailor){
				vm.popups.tailors=true;
			}	
		}
		
		vm.data=jsonData;
		
		vm.orderForm.nextStep = function(){
			
			//Step 1 to Step 2
			if (vm.orderForm.step==1){
				
				//Make sure we've got a fit type
				if (!vm.orderForm.data.fitType){
					return false;
				}
				
				//If we're using a tailor, make sure we've got a tailor
				if (vm.orderForm.data.fitType==2 && !vm.orderForm.data.tailor){
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
		
		
		
   
    var user = aws.getCurrentUserFromLocalStorage();

    if (user){
	    var identityID = bdAPI.setupHeaders(user);
			bdAPI.usersGet(identityID).then(
				function(result){
					vm.user = result.data;	
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