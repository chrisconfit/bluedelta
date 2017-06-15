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
		
		
		//Validate Registration Form
		vm.validateRegistrationForm = function () {
			console.log("validatingf...");
						
			function validatePassword(password){
				//console.log(vm.credentials.password.length > 5);
				//contains numbers
				//console.log(vm.credentials.password.search(/\d/)>-1);
				//contains lowercase letters
				//console.log(vm.credentials.password.search(/[a-z]/) > -1);
				//contains uppercase letters
				//console.log(vm.credentials.password.search(/[A-Z]/) > -1);
				
				//RE to test all
				var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
				return re.test(password);
			}			
								
			function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
			}

			
			if (!vm.credentials.email || !vm.credentials.name || !vm.credentials.password || !vm.credentials.passwordConfirm){
				console.log("this one!");
				console.log(vm.credentials);
				vm.messages.set("All fields are required", "error");
				return false;
			}
			
			if (!validatePassword(vm.credentials.password)){
				vm.messages.set("A valid password must: <ul><li>Be between 6 and 50 characters</li><li>Contain at least one number</li><li>Contain at least one uppercase letter</li><li>Contain at least one lowercase letter</li><li>Contain at least one special character (\"!,@,#,$,%,^,&, or *\")</li>");	
			}
			
			if (vm.credentials.password !== vm.credentials.passwordConfirm){
				vm.messages.set("Password and Confirmation do not match", "error");
				return false;
			}
			
			if(!validateEmail(vm.credentials.email)){
				vm.messages.set("Please Enter a valid E-mail address", "error");
				return false;
			}
			
			return true;
			
		}
		//Register User
    vm.registerUser = function () {
	    vm.messages.reset();
	    
	    if (vm.validateRegistrationForm()){
	      aws.signupForApplication(vm.credentials.email, vm.credentials.password).then(
	      	function(){
						vm.formStep = 2;	      	
		      },   
		      function(err){
				    vm.messages.set(err.message, "error");
			    }
			  );
		  }
    };
    					
		//Confirm User with Registration Code				
    vm.confirmUser = function() {
			vm.resetMessage();
			aws.confirmRegisteredUnauthenticatedUser(vm.credentials.email, vm.credentials.code).then(
      	function(result){
					vm.setMessage($sce.trustAsHtml("Your Account has been confirmed. <a href='/login'>Click here to login</a>"), "success");
	      },   
	      function(err){
		      if (err.message == "Missing required key 'ConfirmationCode' in params") err.message = "Please enter confirmation code";
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