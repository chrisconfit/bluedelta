(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean','popups', '$filter', 'aws', 'bdAPI', '$scope', 'jsonData'];
  function closetCtrl($location, jean, popups, $filter, aws, bdAPI, $scope, jsonData) {
	  

	  
    var vm = this;   
   
		popups.closeAll();
		vm.popups=popups.get();
		
		console.log(vm.popups);
		vm.jean=jean;
		vm.data=jsonData.getData();
		console.log(vm.data);
		vm.jeans = vm.data.jeansList;
		

		vm.onload=function(){
			$scope.vm = vm;	
		}
		
		
		
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
		

	

		
		var logError = function(err){console.log(err)};
		
		
		
		


		vm.copyJean = function(){
			vm.jean = jean.createNew(vm.displayJean);
			$location.path('/customizer');
		}
		
		vm.displayJean={};
		vm.selectJean = function(jean){
			vm.popups.jeanProfile = true; 
			vm.displayJean.data=jean
		}
		
	
		
		//Get User
  }
  



})();