'use strict';

angular.module('inspinia')
  .controller('LoginController', ['$scope', 'aws', '$state', function ($scope, aws, $state) {

    var logvm = this;
    
		logvm.msg = {
			type: "alert-danger",
			message : "",
			reset : function(){
				this.message="";
			},
			set: function(msg, type){
				this.message = msg;
				this.type = type
			}
		}
		
		
    logvm.email="";
    logvm.password="";


    logvm.signupForm = function(form) {

	    if (form.$valid) {
				
				logvm.msg.reset();
	      aws.authenticateCognitoUser(logvm.email,logvm.password).then(
					function(result){
						//User is valid
						$state.go('dashboard.main');
					},
					function(err){
						if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
						logvm.msg.set(err.message,"alert-danger");
					}
				);

      } else {
        form.submitted = true;
      }

    }

  }]);
