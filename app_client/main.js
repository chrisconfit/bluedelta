(function () {

  angular.module('bdApp', ['ngRoute', 'ngAnimate','ngSanitize', 'angular-gestures']); 
  
  
  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/pages/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/pages/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/pages/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/closet', {
        templateUrl: '/pages/closet/closet.view.html',
        controller: 'closetCtrl',
        controllerAs: 'vm'
      })
      .when('/customizer/:jean_id?/:action?', {
        templateUrl: '/pages/customizer/customizer.view.html',
        controller: 'customizerCtrl',
        controllerAs: 'vm'
      })
      .when('/admin', {
        templateUrl: '/pages/admin/admin.view.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
    
   }

  function run($rootScope, $location, aws) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
	    var locked = [
		    '/closet'
	    ];
	    if (locked.indexOf($location.path()) >= 0 ){
		    aws.getCurrentUserFromLocalStorage().then(
			    function(result){
				    return true;
				  },
				  function(err){
					  $location.path('/login');
					}
		    );
	  	}
    });
  }
  
  angular
    .module('bdApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'aws', run])
		.filter('spaceless',function() {
	    return function(input) {
	      if (input) {
	      	return input.replace(/\s+/g, '-');    
	      }
	    }
		})
		.filter('scoreToSpace',function() {
	    return function(input) {
	      if (input) {
	      	return input.replace(/_+/g, ' ');    
	      }
	    }
		})
		.filter('minMax',function(min, max, key) {
			return function(input){
				if (min && input[key] < min) return false;
				if (max && input[key] > max) return false;
		    return true;
		  }  
		})
		.filter('displayName',function() {
			return function(input){				
				return input ? input.replace(/Raw Denim/g, "") : false;
		  }  
		})
		
		.filter('listData',function() {
			return function(input){
				var retObj = {}; 
				var display = [
					'fabric',
					'accent_thread',
					'top_thread',
					'bottom_thread',
					'gender',
					'style'
				];
			
				for (key in input){
					if (display.indexOf(key)>=0)
						retObj[key] = input[key];			
				}
				return retObj;
		  }  
		})
		
		
		
		
		
})();