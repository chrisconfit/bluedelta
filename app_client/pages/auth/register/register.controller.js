(function () {

  angular
    .module('bdApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'aws', '$sce'];
  function registerCtrl($location, aws, $sce) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
	
		vm.formStep = 1;
	    
    vm.messages = {
			message : "",
			type: "",
			set: function(message, type){
				vm.messages.message = message;
				vm.messages.type = type;
			},
			reset: function(){
				vm.messages.message = "";
				vm.messages.type = "";
			}
		}
		
		vm.setMessage = function(message, type){
			vm.messages.message = message;
			vm.messages.type = type;
		}
		
		vm.resetMessage = function(){
			vm.messages.message = "";
			vm.messages.type = "";
		}
		
		
		//Register User
    vm.registerUser = function () {
	    vm.messages.reset();
      aws.signupForApplication(vm.credentials.email, vm.credentials.password).then(
      	function(){
					vm.formStep = 2;	      	
	      },   
	      function(err){
			    vm.messages.set(err.message, "error");
		    }
		  );
    };
    					
		//Confirm User with Registration Code				
    vm.confirmUser = function() {
			vm.resetMessage();
			aws.confirmRegisteredUnauthenticatedUser(vm.credentials.email, vm.credentials.code).then(
      	function(result){
					vm.setMessage($sce.trustAsHtml("Your Account has been confirmed. <a href='/login'>Click here to login</a>"), "success");
	      },   
	      function(err){
			    vm.setMessage(err.message, "error");
		    }
		  );
    };
    
    //Resend Registration code to user via email
    vm.resendCode = function(){
	    //This function throws an error in the SDK and no result... cannot implement promise for now
	    aws.resendConfirmationCode(vm.credentials.email);
	    //We're going to show a success message no matter what
	    //TODO: Implement corrected SDK and promise structure for this functino
	    vm.setMessage("A new confirmation code has been sent to "+vm.credentials.email+". Enter the code above to confirm your account", "success");
    };

  }

})();