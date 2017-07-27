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
			
			.state('users', {
        abstract: true,
        url: "/users",
        templateUrl: "app/components/common/content.html",
        authenticate: true,
        resolve: { 
	        loadPlugin: function ($ocLazyLoad) {
						return $ocLazyLoad.load([
						  {
					      serie: true,
					      files: ['assets/scripts/dataTables/datatables.min.js','assets/styles/dataTables/datatables.min.css']
						  },
						  {
					      serie: true,
					      name: 'datatables',
					      files: ['assets/scripts/dataTables/angular-datatables.min.js']
						  },
						  {
					      serie: true,
					      name: 'datatables.buttons',
					      files: ['assets/scripts/dataTables/angular-datatables.buttons.min.js']
							}
						]);
					}
                
	      }
      })
      .state('users.list', {
        url: "/list",
        templateUrl: "app/users/users.html",
        data: { pageTitle: 'Orders' },
        authenticate: true
      })
      .state('users.add', {
        url: "/add",
        templateUrl: "app/users/users-add.html",
        data: { pageTitle: 'Orders' },
        authenticate: true
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
            },
					  {
				      serie: true,
				      files: ['assets/scripts/dataTables/datatables.min.js','assets/styles/dataTables/datatables.min.css']
					  },
					  {
				      serie: true,
				      name: 'datatables',
				      files: ['assets/scripts/dataTables/angular-datatables.min.js']
					  },
					  {
				      serie: true,
				      name: 'datatables.buttons',
				      files: ['assets/scripts/dataTables/angular-datatables.buttons.min.js']
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
		      		$http.get('/assets/data/vendor.json'),
		      		$http.get('/assets/data/rep.json'),
		      		$http.get('/assets/data/thread.json'),
		      		$http.get('/assets/data/fabric.json'),		      	
		      		$http.get('/assets/data/gender.json')
						]
		      	
		      	return $q.all(data);
		      	    			      	
	        },
	        
	        orderData: function($stateParams, $location, bdAPI, $q){
						
						if ($stateParams.orderId === undefined || $stateParams.orderId == "")
							$location.path('orders/list');

						else{
							var defer = $q.defer();
							bdAPI.setupHeaders();
							bdAPI.ordersGet($stateParams.orderId).then(
								function(result){				
									var returnData = {"order": result.data};
									bdAPI.usersGet(result.data.userId).then(
										function(user){
											returnData.user = user.data;
											defer.resolve(returnData);
										},function(err){
											console.log(err);
											defer.resolve(returnData);
										}
									)
								},
								function(err){
									console.log(err);
									defer.reject(err);
								}
							);
					   	return defer.promise; 
						}
						
    			},
	        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
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
        templateUrl: "app/orders/orders-add.html",
        authenticate: true,
        data: { pageTitle: 'Orders' },
      });
      
      
    $urlRouterProvider.otherwise('dashboard/main');
  }

})();
