(function() {
  
  angular
    .module('bdApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['$window', 'user', 'jsonData', 'api'];
		
		
    function homeCtrl ($window, user, jsonData, api) { 	    
			var vm = this;
		

			
			
			
			for(i = 0 ; i<jsonData.tailors.length; i++){
				var data = jsonData.tailors[i];

				//data.id = data.threadId;
				//delete data['threadId'];
				//delete data['layer'];
				//delete data['thumb'];
				//data.layer = "/";
				//data.thumb = "/";
					console.log(data);
				/*
				api.call("postTailor", data, function(result){
					console.log("Created!");
					console.log(result);
				});
				*/
				
			}
			

			
			
			/*
			
			for(i = 0 ; i<jsonData.thread.length; i++){
				var data = jsonData.thread[i];

				data.id = data.threadId;
				delete data['threadId'];
				delete data['layer'];
				delete data['thumb'];
				data.layer = "/";
				data.thumb = "/";
console.log(data);
				
				api.call("postThread", data, function(result){
					console.log("Created!");
					console.log(result);
				});
				
				
			}
			*/
			
			vm.user = user.get();
			console.log($window.localStorage.getItem("bdAccessToken"));
			/*
	    user.login("chris@confitdesign.com", "i@mF@tty23", function(data){
		    vm.user = data;
		    console.log(data);
				console.log(vm.user);
	    });
	   */
	    	
    }

})();