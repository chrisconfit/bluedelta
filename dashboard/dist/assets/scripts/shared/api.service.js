
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
			'getJean'
		];
		
		//Call an API function and handle data
		var call = function(func, data, success, error){
			console.log("calling "+func);
			console.log("with...");
			console.log(data);
			
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
				console.log(err);
				if (error) error(err);
			});
			
		}
		
				
		//Build HTTP Request
	  var httpReq = function(method, path, data){
		
		  var headers=config.headers;
		  var token = $window.localStorage.getItem('bdAccessToken');
		  if (token) headers.Authorization = "Bearer "+token;
      
			var httpConfig = {
				"method": method,
				"url" : config.url+path,
				"headers" : headers,
			}	
			if(data){
				var dataKey = method=="POST" ? "data":"params"
				httpConfig[dataKey] = data;
			}
			
		  return $http(httpConfig);
		}
		
		
		
		
		/*
		* USER
		*/


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
	  var getJean = function(data){
		  return httpReq("GET", "/api/jean/"+data);
	  }
	  

	  
	  
	  
	  /*
		*  CURRENT USER DATA
		*/
		var postAddress = function(data){
			var path = "/api/users/current/addresses"
			if (data.id) path+="/"+data.id;
			return httpReq("POST", path, data);
		}

		var deleteAddress = function(addressId){
		  return httpReq("DELETE", "/api/users/current/addresses/"+addressId);			
		}
		
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
	  
	  var getMyJeans = function(){
		  return httpReq("GET", "/api/users/current/jeans");
	  }
	  
	  var getMyOrders = function(){
		  return httpReq("GET", "/api/users/current/orders");
	  }
	  var deleteMyJean = function(jeanId){
			return httpReq("DELETE", "/api/users/current/jeans/"+jeanId);
		}
		var placeMyOrder = function(orderCreateObj){
			return httpReq("POST", "/api/users/current/orders", orderCreateObj);
		}
	  
	  
	  
	  
	  /*
		* Admin API
		*/
	  
	  var usersList = function(data){
			return httpReq("GET", "/api/users", data);
	  }

		var userGet = function(userId){
			return httpReq("GET", "/api/users/"+userId);
		}
		
		var usersDelete = function(userId){
			return httpReq("DELETE", "/api/users/"+userId);
		}
		
		var usersCreateAddress = function(data){
			return httpReq("POST", "/api/users/"+data.userId+"/address", data.address);
		}
		
		var usersPost = function(data){
			var path = "/api/users"
			if (data.id) path += "/"+data.id;
			return httpReq("POST", path, data);			
		}
		
		var ordersList = function(data){
			return httpReq("GET", "/api/orders", data);
	  }
	  
		var orderGet = function(orderId){
			return httpReq("GET", "/api/orders/"+orderId);
		}

		
		var data = {};
		
    return {
	    getData:function(){ return data;},
	    
      call : call,
      login: login,
      register: register,
      
      createFabric: createFabric,
      postThread:postThread,
      postTailor:postTailor,
      
      getJean:getJean,
      
      getCurrentUser:getCurrentUser,
      createMyJeans:createMyJeans,
      getMyOrders:getMyOrders,
      getMyJeans:getMyJeans,
      updateMe: updateMe,
      postAddress:postAddress,
      getMyJeans:getMyJeans,
      getMyOrders:getMyOrders,
      deleteMyJean:deleteMyJean,
      deleteAddress: deleteAddress,
      placeMyOrder: placeMyOrder,
      
      usersList:usersList,
      userGet:userGet,
      usersDelete:usersDelete,
      usersCreateAddress:usersCreateAddress,
      usersPost:usersPost,
      ordersList:ordersList,
      orderGet:orderGet
    };
    
  }

})();