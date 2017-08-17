(function () {

  angular
    .module('bdApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','$route','popups', 'aws', '$window', 'loader'];
  function navigationCtrl($location, $route, popups, aws, $window, loader) {
    var vm = this;

		vm.loader = loader.get('loader');
		vm.saver = loader.get('saver');
		vm.drops={};
		vm.drops.acct=false;
		vm.mobileMenu = false;
	/*	
		$scope.$watch(function () { return $localStorage.something; },function(newVal,oldVal){
		   if(oldVal!==newVal && newVal === undefined){
		     console.log('It is undefined'); 
		  }
		});
*/
		vm.isLoggedIn = aws.isLoggedIn();

		vm.logout = function(){			
			aws.signCurrentUserOut();
			if ($location.path() == "/")
				$route.reload();
		}
  }

})();