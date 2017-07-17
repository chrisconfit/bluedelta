(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','$route','popups', 'aws'];
  function navigationCtrl($location, $route, popups, aws) {
    var vm = this;
		

		vm.isLoggedIn = null;
		aws.getCurrentUserFromLocalStorage().then(
			function(result){
				if (result.accessToken != "") vm.isLoggedIn = true;
			},
			function(err){
				console.log(err);
				vm.isLoggedIn = false;
			}
		);
		
		
		//vm.isAdmin = accountManagement.isAdmin();
    //vm.currentUser = accountManagement.currentUser();
		
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
		
		vm.logout = function(){
			aws.signCurrentUserOut();
			if ($location.path() == "/")
				$route.reload();
		}
  }

})();