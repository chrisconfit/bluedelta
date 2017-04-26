(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication','$route','popups'];
  function navigationCtrl($location, authentication, $route, popups) {
    var vm = this;
		
    vm.isLoggedIn = authentication.isLoggedIn();
		vm.isAdmin = authentication.isAdmin();
    vm.currentUser = authentication.currentUser();
		
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
		
		vm.logout = function(){
			authentication.logout();
			if ($location.path() == "/")
				$route.reload();
		}
  }

})();