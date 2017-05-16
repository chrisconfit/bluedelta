(function () {

  angular
    .module('bdApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication', 'aws', 'awsConfig'];
  function registerCtrl($location, authentication, aws, awsConfig) {
    var vm = this;

    // vm credentials has to read like aws stuff
    
    var userPool = aws.createUserPool(awsConfig.poolInfo);
    console.log("userPool from registerCtrl => ", userPool);

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
      .ragister()
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