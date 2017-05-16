(function () {

  angular
    .module('bdApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication', 'aws', 'awsConfig'];
  function registerCtrl($location, authentication, aws, awsConfig) {
    var vm = this;

    var userPool = aws.createUserPool(awsConfig.poolInfo);
    // console.log("userPool from registerCtrl => ", userPool);

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.errors = {
			message : ""
		}

    vm.onSubmit = function () {
      console.log('testing aws method');
      aws.createUserAttributeList(vm.credentials, aws.createUserAttribute);
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