(function () {

  angular.module('bdApp', ['ngRoute', 'ngAnimate','ngSanitize', 'ngCookies', 'angular-gestures', 'user', 'api']); 
  


  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/pages/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm',
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
      .when('/order/:jeanId?', {
        templateUrl: '/pages/order/order.view.html',
        controller: 'orderCtrl',
        controllerAs: 'vm'
      })
      .when('/customizer/:jeanId?/:action?', {
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

  function run($rootScope, $location, user) {
	  if (user.isLoggedIn()) user.setup();
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

	    var locked = [
		    '/closet',
		    '/order'
	    ];
	    
	    if (locked.indexOf($location.path()) >= 0 && !user.isLoggedIn() ){
				$location.path('/login');
	  	}
	  	/* TODO
	  	//If there's no jean on the order screen.... redirect to the customizer page.
	  	if($location.path().indexOf("/order") >= 0 && !Object.keys(jean.data).length){
		  	$location.path('/customizer');
		  };
		  */
		  
    });
  }
  
  
 

	
			

	angular.module('bdApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'user', run])
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
		      var input = input.replace( /([A-Z])/g, " $1" );
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
		
		
		
		
		
	
	// Get Angular's $http module.
	var initInjector = angular.injector(['ng']);
	
	var $http = initInjector.get('$http');
	var $q = initInjector.get('$q');
	
	/*
	var awsJsonUrl = "http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/"
	
	var jsonDataKeys = ['style', 'thread', 'button', 'fabric', 'gender', 'tailors'];
	var promises = [];				
	for (d = 0; d < jsonDataKeys.length; d++){
		promises.push(
			$http.get(awsJsonUrl+jsonDataKeys[d]+'.json')
		);	
	}
	*/
	$http.get("http://ec2-54-200-231-145.us-west-2.compute.amazonaws.com/api/data").then(function(result){
		
		result.data.genders = [
			{"id":1, "name":"Male"},
			{"id":2, "name":"Female"},
		];
		
		result.data.lookup = function(data, key, value, retKey){
			var dataSet = this[data];
			console.log("lookin up !!!");
			retKey = retKey || false;
			for (i=0; i<dataSet.length; i++){				
				if(dataSet[i][key] == value)
					return retKey ? dataSet[i][retKey] : dataSet[i]
			}
		}
		angular.module('bdApp').constant('apiData', result.data);
		var body = document.getElementById('bdApp');
		angular.bootstrap(angular.element(body), ['bdApp']);		
	});
	/*
	$q.all(promises).then(
		function(result){
			var jsonData = {};
			for(r=0;r<result.length;r++){
				var key = result[r].config.url.replace(awsJsonUrl,"").replace(".json","");
				jsonData[key] = result[r].data;
			}
			angular.module('bdApp').constant('jsonData', jsonData);
			var body = document.getElementById('bdApp');
			angular.bootstrap(angular.element(body), ['bdApp']);		
		}
	);
	*/

	

		
		
	
		
})();