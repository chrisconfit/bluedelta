(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
	  
	  
	  
	  
	  /*
		* Resolves Base
		*/
		
		
	  var listScreenResolve = {
		  appData: function(api){return api.getData();}
	  }
	  
	  
		var editplugins = [
		  { insertBefore: '#loadBefore', name: 'toaster', files: ['assets/scripts/toastr/toastr.min.js', 'assets/styles/toastr/toastr.min.css']},
	    { files: ['assets/styles/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']},
	    { name: 'datePicker', files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js']
	    }
	  ];
	  
	  var editScreenResolve = {
		  appData: function(api){return api.getData();},
		  loadPlugin: function ($ocLazyLoad) { return $ocLazyLoad.load(editplugins)}
	  }
	 
	 
		
		
		/*
		* Client Resolves
		*/
		
	  var clientAddScreenResolve = angular.copy(editScreenResolve);
	  clientAddScreenResolve.userData = function(){return {}};
      
    var clientEditScreenResolve = angular.copy(editScreenResolve);
    clientEditScreenResolve.userData = function($stateParams, $location, api, $q){
			if ($stateParams.clientId === undefined || $stateParams.clientId == ""){
				console.log("no clients!!!");
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
		}   
		
		
		
		
		/*
		* Order Resolves
		*/
		
		var orderAddScreenResolve = angular.copy(editScreenResolve);
	  clientAddScreenResolve.orderData = function(){return {}}
		   
		var orderEditScreenResolve = angular.copy(editScreenResolve);
		orderEditScreenResolve.orderData = function($stateParams, $location, bdAPI, $q){
			if ($stateParams.orderId === undefined || $stateParams.orderId == ""){
				console.log("no order!!!");
				$location.path('orders/list');
			}
			else{
				var defer = $q.defer();
				bdAPI.call('ordersGet', [$stateParams.orderId],
					function(result){		
						console.log("route");
						console.log(result);		
						var returnData = {"order": result.data};
						console.log("This user's ID: "+result.data.userId);
						bdAPI.call('usersGet', [result.data.userId],
							function(user){
								returnData.user = user.data;
								defer.resolve(returnData);
							},function(err){
								defer.resolve(returnData);
							}
						)
					},
					function(err){defer.reject(err);}
				);
				return defer.promise; 
			}	
		}
  
	  
	  
	  var getAppData = function($q, $http){
		  var defer = $q.defer();
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
				
				defer.resolve(result.data);
			});
			
			return defer.promise;
		}
							
	  
	  
	  
	  
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
	        appData: function(){return "this";},
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
        url: "/list",
        templateUrl: "app/orders/orders.html",
        authenticate: true,
        controller: "OrdersController as ovm",
        resolve:{
	        appData:getAppData
        }
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
  }

})();
