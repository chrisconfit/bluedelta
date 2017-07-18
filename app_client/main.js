(function () {

  angular.module('bdApp', ['ngRoute', 'ngAnimate','ngSanitize', 'ngCookies', 'angular-gestures']); 
  
  
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
      .when('/order/:jeanId?/:userId?', {
        templateUrl: '/pages/order/order.view.html',
        controller: 'orderCtrl',
        controllerAs: 'vm'
      })
      .when('/customizer/:jeanId?/:userId?', {
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

  function run($rootScope, $location, aws, jean, popups) {
	  
	  /*
	  $location.update_path = function (path, keep_previous_path_in_history) {
      if ($location.path() == path) return;

      var routeToKeep = $route.current;
      var unsubscribe = $rootScope.$on('$locationChangeSuccess', function () {
        if (routeToKeep) {
          $route.current = routeToKeep;
          routeToKeep = null;
        }
        unsubscribe();
        unsubscribe = null;
      });

      $location.path(path);
      if (!keep_previous_path_in_history) $location.replace();
    };
		*/
	  
	  
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
	    var locked = [
		    '/closet',
		    '/order'
	    ];
	    
	    if (locked.indexOf($location.path()) >= 0 && !aws.isLoggedIn() ){
				$location.path('/login');
	  	}
	  	/*
	  	//If there's no jean on the order screen.... redirect to the customizer page.
	  	if($location.path().indexOf("/order") >= 0 && !Object.keys(jean.data).length){
		  	$location.path('/customizer');
		  };
		  */
		  
    });
  }
  
  angular
    .module('bdApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'aws', 'jean', 'popups', run])
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
		

		
		
		
		
		
})();