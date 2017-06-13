(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean','popups', '$filter', 'aws', 'bdAPI'];
  function closetCtrl($location, jean, popups, $filter, aws, bdAPI) {
	  

	  
    var vm = this;
    
    var api = new bdAPI.DefaultApi();
    aws.getCurrentUserFromLocalStorage().then(
    	function(result){
	    	api.apiClient.defaultHeaders['Authorization'] = result;
	    	vm.setUpClosetData();
    	},    	
    	function(err){
	    	console.log('you are not authenticated...'+err);
    	}
    );
    
		vm.popups=popups;
    vm.user = {};
		vm.jeans = [];
		vm.jean={};
		vm.data={};
		
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


		//Set up Closet Data using JSON
		vm.setUpClosetData = function(){
			
			//Get User data
			console.log(api);
			console.log(api.usersList());
			
			vm.setupData('getGenders', 'genders'),
			vm.setupData('getStyles', 'styles'),
			vm.setupData('getFabrics', 'fabrics'),
			vm.setupData('getThreads', 'threads'),
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
		
		vm.jean=jean;
		
	





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