(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', routerConfig]);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
	  $locationProvider.html5Mode(true);
		
		$ocLazyLoadProvider.config({
      debug: false
    });
		
	 
	  
	  
	  /*
		* Resolves Base
		*/
		

	  
		var editplugins = [
		  { insertBefore: '#loadBefore', name: 'toaster', files: ['assets/scripts/toastr/toastr.min.js', 'assets/styles/toastr/toastr.min.css']},
	    { files: ['assets/styles/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']},
	    { name: 'datePicker', files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js']
	    }
	  ];
	  
	  var editScreenResolve = {
		  loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load(editplugins)}]
	  };
	 
	 
		
		
		/*
		* Client Resolves
		*/
		
	  var clientAddScreenResolve = angular.copy(editScreenResolve);
	  clientAddScreenResolve.userData = function(){return {}};
      
    var clientEditScreenResolve = angular.copy(editScreenResolve);
    clientEditScreenResolve.userData = [ '$stateParams', '$location', 'api', '$q', function($stateParams, $location, api, $q){
			if ($stateParams.clientId === undefined || $stateParams.clientId == ""){
				$location.path('clients/list');
			}

			else{
				var defer = $q.defer();
				api.call('userGet', $stateParams.clientId,
					function(result){	defer.resolve(result);	},
					function(err){ defer.reject(err); }
				);
		   	return defer.promise; 
			}
		}];   
		
		
		
		
		/*
		* Order Resolves
		*/
		
		var orderAddScreenResolve = angular.copy(editScreenResolve);
	  orderAddScreenResolve.orderData = function(){return null}
		   
		var orderEditScreenResolve = angular.copy(editScreenResolve);
		orderEditScreenResolve.orderData = [ '$stateParams', '$location', 'api', '$q', function($stateParams, $location, api, $q){
		
			if ($stateParams.orderId === undefined || $stateParams.orderId == ""){
				$location.path('orders/list');
			}
			else{
				var defer = $q.defer();
				var ret = {};
				api.call('orderGet', $stateParams.orderId,
					function(result){	
						defer.resolve(result);
					},
					function(err){ defer.reject(err); }
				);
			}
			
			return defer.promise; 
		}];	
		
  
	  
	  
	  							
	  
	  
	  
	  
		/*
		* Routes
		*/	  
		
    $stateProvider
 
    	.state('login', {
        url: "/login",
        templateUrl: "app/login/login.html",
        authenticate: false
      })
    
      .state('forgot_password', {
        url: "/forgot-password",
        templateUrl: "app/forgot_password/forgot_password.html",
        authenticate: false
      }) 
    	
      .state('dashboard', {
        abstract: true,
        url: "/dashboard",
        templateUrl: "app/components/common/content.html",
        authenticate: true
      })
      
      .state('dashboard.main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        authenticate: true
      })
			
			.state('clients', {
        abstract: true,
        url: "/clients",
        templateUrl: "app/components/common/content.html",
        authenticate: true,
        resolve: { 
	        loadPlugin: function ($ocLazyLoad) {
						return $ocLazyLoad.load([
							{	files: ['assets/scripts/sweetalert/sweetalert.min.js', 'assets/styles/sweetalert/sweetalert.css']},
	            {name: 'oitozero.ngSweetAlert', files: ['assets/scripts/sweetalert/angular-sweetalert.min.js']}
						]);
					}
                
	      }
      })
      
      .state('clients.list', {
        url: "/list",
        templateUrl: "app/clients/clients.html",
        authenticate: true
      })
      
      .state('clients.add', {
        url: "/add",
        templateUrl: "app/clients/clients-edit.html",
        controller: "ClientsEditController as cvm",
        authenticate: true,
        resolve: clientAddScreenResolve
      })
      
      .state('clients.edit', {
        url: "/edit/:clientId",
        templateUrl: "app/clients/clients-edit.html",
        authenticate: true,
        controller: "ClientsEditController as cvm",
        resolve: clientEditScreenResolve
      })

      .state('orders', {
        abstract: true,
        url: "/orders",
        templateUrl: "app/components/common/content.html",
        authenticate: true,
        resolve: { 
	        loadPlugin: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
				    {	files: ['assets/scripts/sweetalert/sweetalert.min.js', 'assets/styles/sweetalert/sweetalert.css']},
            { name: 'oitozero.ngSweetAlert', files: ['assets/scripts/sweetalert/angular-sweetalert.min.js'] },
            { serie: true, files: ['assets/scripts/daterangepicker/daterangepicker.js', 'assets/styles/daterangepicker/daterangepicker-bs3.css'] },
            { name: 'daterangepicker', files: ['assets/scripts/daterangepicker/angular-daterangepicker.js']},
            { name: 'datePicker', files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js'] }
					]);
					}
	      }
      })
      
      .state('orders.list', {
        url: "/list?:user_id",
        templateUrl: "app/orders/orders.html",
        authenticate: true,
        controller: "OrdersController as ovm",
      })
      
      .state('orders.edit', {
        url: "/edit/:orderId",
        templateUrl: "app/orders/orders-edit.html",
        authenticate: true,
        controller: "OrdersEditController as ovm",
        resolve: orderEditScreenResolve
      })
      
      .state('orders.add', {
        url: "/add",
        templateUrl: "app/orders/orders-edit.html",
        authenticate: true,
        controller: "OrdersEditController as ovm",
        resolve: orderAddScreenResolve
      })      
      
    $urlRouterProvider.otherwise('orders/list');
  };

})();
