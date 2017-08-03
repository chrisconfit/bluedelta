(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
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
							{	
	                files: ['assets/scripts/sweetalert/sweetalert.min.js', 'assets/styles/sweetalert/sweetalert.css']
	            },
	            {
	                name: 'oitozero.ngSweetAlert',
	                files: ['assets/scripts/sweetalert/angular-sweetalert.min.js']
	            }
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
        templateUrl: "app/clients/clients-add.html",
        authenticate: true
      })
      
      .state('clients.edit', {
        url: "/edit/:clientId",
        templateUrl: "app/clients/clients-edit.html",
        authenticate: false,
        controller: "ClientsEditController as cvm",
        resolve: {
	        jsonData: function($http, $q){
		      	var data=[
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/vendor.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/rep.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/thread.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/fabric.json'),		      	
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/gender.json')
						]
		      	return $q.all(data);
		      	    			      	
	        },
	        
	        userData: function($stateParams, $location, bdAPI, $q){
						
						if ($stateParams.userId === undefined || $stateParams.userId == "")
							$location.path('users/list');

						else{
							var defer = $q.defer();
							bdAPI.call('usersGet', [$stateParams.userId],
								function(result){				
									var returnData = {"user": result.data};
									returnData.client = client.data;
									defer.resolve(returnData);									
								},
								function(err){
									defer.reject(err);
								}
							);
					   	return defer.promise; 
						}
						
    			},
	        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
	            {
								insertBefore: '#loadBefore',
								name: 'toaster',
								files: ['assets/scripts/toastr/toastr.min.js', 'assets/styles/toastr/toastr.min.css']
	            },
	            { 
		            files: ['assets/styles/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
		          },
              {
                name: 'datePicker',
                files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js']
              }
            ])
	        }
	      }
      })

      .state('orders', {
        abstract: true,
        url: "/orders",
        templateUrl: "app/components/common/content.html",
        authenticate: true,
        resolve: { 
	        loadPlugin: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
				    {	
                files: ['assets/scripts/sweetalert/sweetalert.min.js', 'assets/styles/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['assets/scripts/sweetalert/angular-sweetalert.min.js']
            }
					]);
					}
                
	      }
      })
      .state('orders.list', {
        url: "/list",
        templateUrl: "app/orders/orders.html",
        authenticate: true,
        data: { pageTitle: 'Orders' },
      })
      .state('orders.edit', {
        url: "/edit/:orderId",
        templateUrl: "app/orders/orders-edit.html",
        authenticate: false,
        controller: "OrdersEditController as ovm",
        resolve: {
	        jsonData: function($http, $q){
		      	var data=[
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/vendor.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/rep.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/thread.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/fabric.json'),		      	
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/gender.json')
						]
		      	return $q.all(data);
		      	    			      	
	        },
	        
	        orderData: function($stateParams, $location, bdAPI, $q){
						
						if ($stateParams.orderId === undefined || $stateParams.orderId == "")
							$location.path('orders/list');

						else{
							var defer = $q.defer();
							bdAPI.call('ordersGet', [$stateParams.orderId],
								function(result){				
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
								function(err){
									defer.reject(err);
								}
							);
					   	return defer.promise; 
						}
						
    			},
	        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
	            {
								insertBefore: '#loadBefore',
								name: 'toaster',
								files: ['assets/scripts/toastr/toastr.min.js', 'assets/styles/toastr/toastr.min.css']
	            },
	            { 
		            files: ['assets/styles/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
		          },
              {
                name: 'datePicker',
                files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js']
              }
            ])
	        }
	      }
      })
      
      
      .state('orders.add', {
        url: "/add",
        templateUrl: "app/orders/orders-edit.html",
        authenticate: false,
        controller: "OrdersEditController as ovm",
        resolve: {
	        jsonData: function($http, $q){
		      	var data=[
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/vendor.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/rep.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/thread.json'),
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/fabric.json'),		      	
		      		$http.get('http://bluedelta-data.s3-website-us-east-1.amazonaws.com/data/gender.json')
						]
		      	return $q.all(data);
		      	    			      	
	        },
	        
	        orderData: function(){ return {} },
	        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
	            {
								insertBefore: '#loadBefore',
								name: 'toaster',
								files: ['assets/scripts/toastr/toastr.min.js', 'assets/styles/toastr/toastr.min.css']
	            },
	            { 
		            files: ['assets/styles/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
		          },
              {
                name: 'datePicker',
                files: ['assets/styles/datapicker/angular-datapicker.css','assets/scripts/datapicker/angular-datepicker.js']
              }
            ])
	        }
	      }
      })      
      
    $urlRouterProvider.otherwise('orders/list');
  }

})();
