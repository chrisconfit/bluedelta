(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','$route','popups', 'user', '$window', 'loader'];
  function navigationCtrl($location, $route, popups, user, $window, loader) {
    var vm = this;

		vm.loader = loader.get('loader');
		vm.saver = loader.get('saver');
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
				
		vm.isLoggedIn = user.isLoggedIn();

		vm.logout = function(){			
			user.logout();
		}
  }

})();