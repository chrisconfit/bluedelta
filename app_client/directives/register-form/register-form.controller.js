(function () {

  angular
    .module('bdApp')
    .controller('registerFormCtrl', registerFormCtrl);

  registerFormCtrl.$inject = ['$location', 'aws', '$sce', 'messages'];
  
  function registerFormCtrl($location, aws, $sce, messages) {
    var regvm = this;
    
		regvm.messages=messages.get();
		
		regvm.credentials = {
      name : "",
      email : "",
      password : ""
    };
	
		//Validate Registration Form
		regvm.validateRegistrationForm = function () {
						
			function validatePassword(password){
				//console.log(regvm.credentials.password.length > 5);
				//contains numbers
				//console.log(regvm.credentials.password.search(/\d/)>-1);
				//contains lowercase letters
				//console.log(regvm.credentials.password.search(/[a-z]/) > -1);
				//contains uppercase letters
				//console.log(regvm.credentials.password.search(/[A-Z]/) > -1);
				
				//RE to test all
				var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
				return re.test(password);
			}			
								
			function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
			}

			
			if (!regvm.credentials.email || !regvm.credentials.name || !regvm.credentials.password || !regvm.credentials.passwordConfirm){
				messages.set("All fields are required", "error");
				return false;
			}
			
			if (!validatePassword(regvm.credentials.password)){
				messages.set("A valid password must: <ul><li>Be between 6 and 50 characters</li><li>Contain at least one number</li><li>Contain at least one uppercase letter</li><li>Contain at least one lowercase letter</li><li>Contain at least one special character (\"!,@,#,$,%,^,&, or *\")</li>");	
			}
			
			if (regvm.credentials.password !== regvm.credentials.passwordConfirm){
				messages.set("Password and Confirmation do not match", "error");
				return false;
			}
			
			if(!validateEmail(regvm.credentials.email)){
				messages.set("Please Enter a valid E-mail address", "error");
				return false;
			}
			
			return true;
			
		}
		
		
		
		//Register User
    regvm.registerUser = function () {
	    messages.reset();
	    
	    if (regvm.validateRegistrationForm()){
	      aws.signupForApplication(regvm.credentials.email, regvm.credentials.password).then(
	      	function(){
						if ($scope.callback) $scope.callback();
						if ($scope.redirect) $location.path($scope.redirect);
						if (!$scope.callback && $scope.redirect)	$location.path('/customizer');    	
		      },   
		      function(err){
				    messages.set(err.message, "error");
			    }
			  );
		  }
    };	
    
    
    		
  }

})();