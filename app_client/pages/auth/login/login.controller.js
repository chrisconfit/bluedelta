(function () {

  angular
  .module('bdApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'aws'];
  function loginCtrl($location, aws) {
    var vm = this;
		
		vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
	  
	  vm.messages = {
			message : "",
			type: "",
			set: function(message, type){
				vm.messages.message = message;
				vm.messages.type = type;
			},
			reset:function(){
				vm.messages.message = "";
				vm.messages.type = "";
			}
		}
		

		//aws.getCurrentUserFromLocalStorage();
		
		vm.login = function(email, password){
			aws.authenticateCognitoUser(email,password).then(
				function(result){
					$location.path('/closet');
				},
				function(err){
					vm.messages.set(err.message,"error");
				}
			);
		}


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
    
        /*
	    
	     aws.checkUserForConfirmation(vm.credentials.email);
			      //Check to see if user is already confirmed
			      
			      vm.setMessage("We already have an unconfirmed user associated with this email address. Please check your email for the confirmation code or use the link above to resend.", "warning");
			      vm.formStep = 2;
			      
			      vm.setMessage(err.message, "error");
		      }else{
			      
			      */

  }

})();