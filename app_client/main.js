(function () {

  angular.module('meanApp', ['ngRoute', 'ngAnimate','ngTouch']); 
  
  
  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/closet', {
        templateUrl: '/closet/closet.view.html',
        controller: 'closetCtrl',
        controllerAs: 'vm'
      })
      .when('/customizer', {
        templateUrl: '/customizer/customizer.view.html',
        controller: 'customizerCtrl',
        controllerAs: 'vm'
      })
      .when('/admin', {
        templateUrl: '/admin/admin.view.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
	    var locked = [
		    '/closet'
	    ];
	    
	    if (locked.indexOf($location.path()) >= 0  && !authentication.isLoggedIn()) {
       // $location.path('/login');
      }
    });
  }
  
  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run])
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
		.directive('drag', ['$swipe',
		  function($swipe) {
		
		    return {
		      restrict: 'A',
		      scope: {
		        onDrag: '&'
		      },
		      link: function(scope, ele, attrs, ctrl) {
			      $swipe.bind(ele, {
		          'start': function(coords) {
		            scope.onDrag(coords);
		          }
			      });
			    }
		    }
		    
		}])
		
		
		
		
})();