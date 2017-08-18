(function () {

  angular
    .module('bdApp')
    .controller('loginFormCtrl', loginFormCtrl);

  loginFormCtrl.$inject = ['$location', 'user', 'messages', '$scope', 'aws'];
  
  function loginFormCtrl($location, user, messages, $scope, aws) {
    var logvm = this;
    
		logvm.messages=messages.get();
		
		logvm.credentials = {
      loginEmail : "",
      loginPassword : ""
    };
    
    
  	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
		}
		
    /*
    *
    * LOGGING IN
    *
    */
    
    //Log user in and send errors to "messages"
		logvm.login = function(email, password){
			messages.reset();
	    if (logvm.validateLoginForm()){
		    console.log('valid');
	      user.login(email, password, function(){
					if ($scope.callback) $scope.callback();
					if ($scope.redirect) $location.path($scope.redirect);
					if (!$scope.callback && !$scope.redirect)	$location.path('/customizer');
				},
				function(err){
					if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
					messages.set(err.message,"error");
				});
		  }
		}
		
		//Login form validation
		logvm.validateLoginForm = function(){				
			if(!validateEmail(logvm.credentials.loginEmail)){
				messages.set("Please enter a valid Email address", "error");
				return false;
			}
			if (!logvm.credentials.loginPassword){
				messages.set("Please enter a password", "error");
				return false;
			}
			return true;	
		}
		
		
		
		
		
		
		
		
		/*
		*
		*  Forgot Password
		*
		*/
		
		
		function validatePassword(password){
			var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
			return re.test(password);
		}				

		logvm.forgotPassword = false;
		logvm.forgotPassword2 = false;
		
		/*
		*  STEP 1
		*/
		logvm.forgot = function(){	
			messages.reset();
	    if (logvm.validateForgot()){
				aws.forgotPassword(logvm.credentials.loginEmail).then(
					function(result){
						logvm.forgotPassword2 = true;	
					},
					function(err){
						if (err.message == "Username/client id combination not found"){
							err.message = "We don't have an account registered for that emial";
						}
						messages.set(err.message,"error");
					}
				);
		  }
		}
		
		//Forgot password set 1 validation
		logvm.validateForgot = function(){				
			if(!validateEmail(logvm.credentials.loginEmail)){
				messages.set("Please enter a valid Email address", "error");
				return false;
			}
			return true;	
		}
		
		
		/*
		*   STEP 2
		*/	
		logvm.forgot2 = function(){
			messages.reset();
	    if (logvm.validateForgot2()){
				aws.setNewPassword(logvm.credentials.loginEmail, logvm.credentials.loginVerifcation, logvm.credentials.newPassword).then(
					function(){
						//Password reset successfully...
						messages.set("Password reset successfully. Try logging in.", "success");
						logvm.forgotPassword = false;
						logvm.forgotPassword2 = false;
					},
					function(err){
						messages.set(err.message,"error");
					}
				);
		  }
		}
		
		//Forgot password set 1 validation
		logvm.validateForgot2 = function(){				
			if(!validateEmail(logvm.credentials.loginEmail)){
				messages.set("Please enter a valid Email address", "error");
				return false;
			}
			
			if (!logvm.credentials.loginVerifcation){
				messages.set("Please enter your verifcation code", "error");
				return false;
			}

			if (!validatePassword(logvm.credentials.newPassword)){
				messages.set("A valid password must: <ul><li>Be between 6 and 50 characters</li><li>Contain at least one number</li><li>Contain at least one uppercase letter</li><li>Contain at least one lowercase letter</li><li>Contain at least one special character (\"!,@,#,$,%,^,&, or *\")</li>");	
			}

			if (logvm.credentials.newPassword !== logvm.credentials.newPasswordConfirm){
				messages.set("Password and Confirmation do not match", "error");
				return false;
			}
			
			return true;	
		}
		
		
		
		
	
		
		
		
		
		
		
		
		
		
		//Log in via Facebook
		logvm.loginFB = function(){
			aws.authenticateViaFB().then(
				function(result){
					$location.path('/closet');
				},
				function(err){
					messages.set(err.message,"error");
				}
			);
		}

			
  }

})();