

function formValidation($scope) {
	
    $scope.signupForm = function() {
        if ($scope.signup_form.$valid) {
            // Submit as normal
        } else {
            $scope.signup_form.submitted = true;
        }
    }

    $scope.signupForm2 = function() {
        if ($scope.signup_form.$valid) {
            // Submit as normal
        }
    }

};


angular
    .module('inspinia')
    .controller('formValidation', formValidation)