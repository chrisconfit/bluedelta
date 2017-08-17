(function() {
  
  angular
    .module('bdApp')
    .controller('homeCtrl', homeCtrl);
			
		homeCtrl.$inject = ['user'];
		
		
    function homeCtrl (user) {
	    
			var vm = this;
			vm.user = user.get();
			
	    user.login("cplefevre@gmail.com", "i@mF@tty23", function(user){
		    console.log('second user');
				console.log(vm.user);
	    });
	    
			console.log('first user');
	    console.log(vm.user);
	    	
    }

})();