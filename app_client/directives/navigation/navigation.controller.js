(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','$route','popups', 'aws', '$window'];
  function navigationCtrl($location, $route, popups, aws, $window) {
    var vm = this;
		
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
		
		vm.isLoggedIn = JSON.parse($window.localStorage.isLoggedIn);	
		vm.logout = function(){			
			aws.signCurrentUserOut();
			if ($location.path() == "/")
				$route.reload();
		}
  }

})();