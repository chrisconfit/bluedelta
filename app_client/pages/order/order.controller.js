(function() {
  
  angular
    .module('bdApp')
    .controller('orderCtrl', orderCtrl);

  orderCtrl.$inject = ['$location', 'jean','popups', '$filter', 'aws', 'bdAPI', '$scope', 'jsonData'];
  function orderCtrl($location, jean, popups, $filter, aws, bdAPI, $scope, jsonData) {
	  

	  
    var vm = this;
    vm.popups=popups.get();
   
		vm.jean=jean;
		
		vm.orderForm={};
		vm.orderForm.step=1;
		
		vm.orderForm.data = {}
		vm.chooseFitType = function(type){
			vm.orderForm.data.fitType = type;
			
			if (type == 2 && !vm.orderForm.data.tailor){
				vm.popups.tailors=true;
			}
			
		}
		
		vm.tailorLocations=[];
		
		vm.data=jsonData.getData();
		
		
		vm.orderForm.nextStep = function(){
			
			console.log("running next step...");
			
			//Step 1 to Step 2
			if (vm.orderForm.step==1){
				
				//Make sure we've got a fit type
				if (!vm.orderForm.data.fitType){
					console.log("no fit type");
					return false;
				}
				
				//If we're using a tailor, make sure we've got a tailor
				if (vm.orderForm.data.fitType==2 && !vm.orderForm.data.tailor){
					console.log("no tailor");
					vm.popups.tailors=true;
					return false;
				}
				
				vm.orderForm.step=2;
				return;
			}
			
		}
		
		
		
		
		vm.jeans = [];
    aws.getCurrentUserFromLocalStorage().then(
    	function(result){
	    	
	    	bdAPI.defaultHeaders_['Authorization'] = result.idToken.getJwtToken();
	    	
	    	//Set Up user
	    	var idTokenPayload = result.idToken.jwtToken.split('.')[1];
				var userID = JSON.parse(atob(idTokenPayload)).sub;				
				bdAPI.usersGet(userID).then(
					function(result){
						vm.user = result.data;	
						$scope.$apply();
						
						//var user = result.data;
						//user.name = "Chris LeFevre";
						//bdAPI.usersUpdate(userID, user);
					}, 
					function(err){console.log(err)} 
				);
    	},    	
    	function(err){
	    	console.log('you are not authenticated...'+err);
    	}
    );
		

		

	


		//Get User
  }
  



})();