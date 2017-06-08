(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','accountManagement','$route','popups'];
  function navigationCtrl($location, accountManagement, $route, popups) {
    var vm = this;
		
    //vm.isLoggedIn = accountManagement.isLoggedIn();
		//vm.isAdmin = accountManagement.isAdmin();
    //vm.currentUser = accountManagement.currentUser();
		
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
		
		vm.logout = function(){
			//accountManagement.logout();
			if ($location.path() == "/")
				$route.reload();
		}
  }

})();