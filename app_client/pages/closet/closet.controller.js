(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean','popups', '$filter', 'aws', 'bdAPI'];
  function closetCtrl($location, jean, popups, $filter, aws, bdAPI) {
	  

	  
    var vm = this;
    
		vm.popups=popups;
		vm.jean=jean;
		vm.data={};
		vm.jeans = [];
    aws.getCurrentUserFromLocalStorage().then(
    	function(result){
	    	
	    	bdAPI.defaultHeaders_['Authorization'] = result.idToken.getJwtToken();
	    	vm.setUpClosetData();
	    	
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
		

		//Utility function for setting up customizer data from JSON... 
		vm.setupData = function (func, dataKey) {
		  bdAPI.jsonData[func]()
		   .success(function(data) {
        vm.data[dataKey] = data;
      })
      .error(function (e) {
        console.log(e);
      });
		}

		
		var logError = function(err){console.log(err)};
		
		
		//Set up Closet Data using JSON
		vm.setUpClosetData = function(){
	
		
			
	
			
			vm.setupData('getGenders', 'genders');
			vm.setupData('getStyles', 'styles');
			vm.setupData('getFabrics', 'fabrics');
			vm.setupData('getThreads', 'threads');
			
			bdAPI.jsonData.getJeansByUser(1)
		  .success(function(data) {
				for (x=0; x<data.length; x++){
					vm.jeans.push(data[x]);
				}
      })
      .error(function (e) {
        console.log(e);
      });
      
		}
		

		
	





		vm.dataLookup = function(jeanKey, id, attr){

			if (typeof jeanKey == 'undefined' || typeof id == 'undefined') return false;
			attr = attr||null;
			
			var dataKey = (jeanKey.includes("thread") ? "threads" : jeanKey+"s");
			
			var dataSet = vm.data[dataKey];
			selected = $filter('filter')(dataSet, {id: id})[0];
			if (!attr) return selected;
			else return selected[attr];	
		}
		
		vm.copyJean = function(){
			vm.jean = jean.createNew(vm.jean);
			$location.path('/customizer');
		}
		
		vm.selectJean = function(jean){
			console.log(jean);
			console.log(vm.jean);
			vm.popups.jeanProfile = true; 
			vm.jean.data=jean
		}
		
	
		
		//Get User
  }
  



})();