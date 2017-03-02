(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication','$route'];
  function navigationCtrl($location, authentication, $route) {
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