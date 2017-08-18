(function() {
  
  angular
    .module('bdApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['$window', 'user'];
		
		
    function homeCtrl ($window, user) { 	    
			var vm = this;
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