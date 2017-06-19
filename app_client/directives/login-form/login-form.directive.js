(function () {

  angular
    .module('bdApp')
    .directive('loginForm', loginForm);
		

	
  function loginForm () {
    return {
      restrict: 'AE',
      templateUrl: '/directives/login-form/login-form.template.html',
      controller: 'loginFormCtrl as logvm',
      link: function ($scope, element, attrs) {
        $scope.redirect = attrs.redirect;
  		}
    };
    
  }
  
    
  
  

})();