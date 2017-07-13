(function () {

  angular
    .module('bdApp')
    .controller('loginFormCtrl', loginFormCtrl);

  loginFormCtrl.$inject = ['$location', 'aws', 'messages', '$scope'];
  
  function loginFormCtrl($location, aws, messages, $scope) {
    var logvm = this;
    console.log($scope);
    
		logvm.messages=messages.get();
		
		logvm.credentials = {
      loginEmail : "",
      loginPassword : ""
    };
		
		//Login form validation
		logvm.validateLoginForm = function(){				
			function validateEmail(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
			}
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
		
		//Log user in and send errors to "messages"
		logvm.login = function(email, password){
			console.log("loggingin");
			messages.reset();
	    if (logvm.validateLoginForm()){
		    console.log('valid');
	      aws.authenticateCognitoUser(email,password).then(
					function(result){
						if ($scope.callback) $scope.callback();
						if ($scope.redirect) $location.path($scope.redirect);
						if (!$scope.callback && $scope.redirect)	$location.path('/closet');
					},
					function(err){
						if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
						messages.set(err.message,"error");
					}
				);
		  }
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