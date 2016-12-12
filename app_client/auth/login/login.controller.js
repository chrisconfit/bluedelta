(function () {

  angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;
		
		vm.errors = {
			message : ""
		}
		
    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
	    vm.errors.message = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          console.log(err);
          vm.errors.message = err.message;
        })
        .then(function(){
          $location.path('closet');
        });
    };

  }

})();