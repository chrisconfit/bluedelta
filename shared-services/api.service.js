
(function() {

  angular
    .module('api', [])
    .service('api', api);
		
	api.$inject = ['$http', '$q', '$rootScope', '$window'];

  function api($http, $q, $rootScope, $window) {

		/*
		* SETUP
		*/
		
		var config = {
			client_id:2,
			client_secret: "8xHu3MLzZXr3pcUneGCM08XOzMc5rH5AOtJSCdIP",
			url :  "http://ec2-54-200-231-145.us-west-2.compute.amazonaws.com",
			headers: {'Content-Type':'application/json'}
			
		};
		
		var noTokenNecessary = [
			'login',
			'register',
			'forgotPassword',
		];
		
		//Call an API function and handle data
		var call = function(func, data, success, error){
			
			accessToken = $window.localStorage.getItem('bdAccessToken');
			
			if (noTokenNecessary.indexOf(func) < 0 && !accessToken){
				var message = "Request being made with no access token.";
				var err = new Error(message);
				throw err;
				if (error) error(err);
				return false;
			}

			this[func](data)
			.success(function(result){
				if (success) success(result);
				$rootScope.$$phase || $rootScope.$apply();
			})
			.error(function(err, status, headers) {	
				console.log(err.message);
				if (error) error(err);
			});
			
		}
		
				
		//Build HTTP Request
	  var httpReq = function(method, path, data){
		
		  var headers=config.headers;
		  var token = $window.localStorage.getItem('bdAccessToken');
		  if (token) headers.Authorization = "Bearer "+token;
      
     console.log(headers);
			console.log(data);
		  
			var httpConfig = {
				"method": method,
				"url" : config.url+path,
				"headers" : headers,
				"data":data
			}	
			
			console.log(httpConfig);
		  return $http(httpConfig);
		}
		

		/*
		* AUTH
		*/
		
		var login = function(data){
			return httpReq("POST", "/api/login", data);
		}
		
		var register = function(data){
			return httpReq("POST", "/api/register", data);
		}
	  
	  

	  
	  
	  
	  
	  
	  
	  /*
		*  JEANS
		*/
	  var getJeans = function(data){
		  var path = "/api/jeans/";
		  if (data.id) path+= data.id;
		  return $http.get(config.url+path);
	  }
	  

	  
	  
	  
	  /*
		*  CURRENT USER DATA
		*/
		var createMyJeans = function(data){
		  return httpReq("POST", "/api/users/current/jeans", data);
	  }
		
		var getCurrentUser = function(){
			return httpReq("GET", "/api/users/current");
		}
		
		var getMyJeans = function(){
			return httpReq("GET", "/api/users/current/jeans");	
		}
		
		var getMyOrders = function(){
			return httpReq("GET", "/api/users/current/orders");	
		}
		
		var updateMe = function(data){
			return httpReq("POST", "/api/users/current", data);	
		}
	  
	  
		var createFabric = function(data){
			return httpReq("POST", "/api/fabrics", data);
		}
		
		var postThread = function(data){
			return httpReq("POST", "/api/threads", data);
		}
		
		var postTailor = function(data){
			return httpReq("POST", "/api/tailors", data);
		}
	  
	  
	  
	  

		
		
    return {
      call : call,
      login: login,
      register: register,
      
      createFabric: createFabric,
      postThread:postThread,
      postTailor:postTailor,
      
      getCurrentUser:getCurrentUser,
      createMyJeans:createMyJeans,
      getMyOrders:getMyOrders,
      getMyJeans:getMyJeans,
      updateMe: updateMe
      
    };
    
  }

})();