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
		
		vm.validateLoginForm = function(){					
			function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
			}
			if(!validateEmail(vm.credentials.email)){
				vm.messages.set("Please enter a valid Email address", "error");
				return false;
			}
			if (!vm.credentials.password){
				vm.messages.set("Please enter a password", "error");
				return false;
			}
			return true;	
		}
		
		vm.login = function(email, password){
			
			vm.messages.reset();
	    
	    if (vm.validateLoginForm()){
	      aws.authenticateCognitoUser(email,password).then(
					function(result){
						$location.path('/closet');
					},
					function(err){
						if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
						vm.messages.set(err.message,"error");
					}
				);
		  }

		}
		
		vm.loginFB = function(){
			aws.authenticateViaFB().then(
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