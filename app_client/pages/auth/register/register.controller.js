(function () {

  angular
    .module('bdApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.errors = {
			message : ""
		}

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          //alert(err);
          console.log(err);
          vm.errors.message = err.message;
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();