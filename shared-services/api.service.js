
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
			'getResetToken',
			'resetPassword',
			'forgotPassword',
			'getJean'
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
		* AUTH
		*/
		
		var login = function(data){
			return httpReq("POST", "/api/login", data);
		}
		
		var register = function(data){
			return httpReq("POST", "/api/register", data);
		}
	  
	  var getResetToken = function(data){
			return httpReq("POST", "/api/passwordtoken",  {email:data});
		}
		
		var resetPassword = function(data){
			return httpReq("POST", "/api/passwordreset", data);
		}
	  
	  

	  
	  
	  
	  
	  
	  
	  /*
		*  JEANS
		*/
	  var getJean = function(data){
		  return httpReq("GET", "/api/jean/"+data);
	  }
	  
	  function jeanKeytoURL(key){
			switch(key){
				case "gender_option_id":
	      return "g";
	      break;
	      
	      case "style_option_id":
	      return "s";
	      break;
	      
	      case "fabric_id":
	      return "f";
	      break;
	      
	      case "top_thread_id":
	      return "tt";
	      break;
	      
	      case "bottom_thread_id":
	      return "tb";
	      break;
	      
	      case "accent_thread_id":
	      return "ta";
	      
	      default: return false;
			}
		}
		
		getDataCode = function(jeanData){
			var url = "";			
			for (var property in jeanData) {
			  if (jeanData.hasOwnProperty(property)) {
					var id = jeanData[property];
					var urlKey = jeanKeytoURL(property);
					if (urlKey) url += "_"+urlKey+id;
			  }
			}	
			url = url.replace(/(^[_\s]+)|([_\s]+$)/g, '');
			return url;
		}
	  
		function loadImage(src) {
			return $q(function(resolve,reject) {
			  var image = new Image();
			  image.crossOrigin = "";
			  image.src = src;
			  image.onload = function() {
			    resolve(image);
			  };
			  image.onerror = function(e) {
			    reject(e);
			  };
			})
		}   
    
	 function searchAndDraw(key, cntxt, images){
			for(i=0; i<images.length; i++){
				var image = images[i];
				if(image.src.indexOf("/"+key+"/") > -1){
					cntxt.drawImage(image,0,0,600,696);
				};
			}
		}
		
	  var createThumb = function(jeanData){
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
			var images = [
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/fabrics/g'+jeanData.gender_option_id+'/s2/f'+jeanData.fabric_id+'.jpg',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/tb/'+jeanData.bottom_thread_id+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/tt/'+jeanData.top_thread_id+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/ta/'+jeanData.accent_thread_id+'.png'
			];
	
	    for(var i=0; i<images.length; i++){
	      promises.push(loadImage(images[i], cntxt));
	    }
	    
	    return $q.all(promises).then(
	    	function(results) {
					searchAndDraw("fabrics", cntxt, results);
					searchAndDraw("tb", cntxt, results);
					searchAndDraw("tt", cntxt, results);
					searchAndDraw("ta", cntxt, results);
		      var dataUrl = canvas.toDataURL('image/jpeg');
					return dataUrl;
		    },    
		    function(err){
			    console.log(err);
		    }
	    );	
		}
		
		
		
	  

	  
	  
	  
	  /*
		*  CURRENT USER DATA
		*/
		var postMyAddress = function(data){
			var path = "/api/users/current/addresses"
			if (data.id) path+="/"+data.id;
			return httpReq("POST", path, data);
		}

		var deleteMyAddress = function(addressId){
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
		
		var ordersDelete = function(orderId){
			return httpReq("DELETE", "/api/orders/"+orderId);
		}
		
		var ordersPost = function(data){
			var path = "/api/orders";
			if (data.id) path += "/"+data.id
			console.log(path);
			console.log(data);
			return httpReq("POST", path, data);
		}
		
		var postAddress = function(data){
			return httpReq("POST", "/api/users/"+data.userId+"/addresses", data.address);
		}
		
		var commentsCreate = function(data){
			return httpReq("POST", "/api/orders/"+data.orderId+"/comments", data.comment);
		}
		
		var data = {};
		
    return {
	    getData:function(){ return data;},
	    
      call : call,
      login: login,
      register: register,
      getResetToken:getResetToken,
			resetPassword:resetPassword,
      
      getJean:getJean,
      createThumb:createThumb,
      getDataCode:getDataCode,
      
      getCurrentUser:getCurrentUser,
      createMyJeans:createMyJeans,
      getMyOrders:getMyOrders,
      getMyJeans:getMyJeans,
      updateMe: updateMe,
      postMyAddress:postMyAddress,
      getMyJeans:getMyJeans,
      getMyOrders:getMyOrders,
      deleteMyJean:deleteMyJean,
      deleteMyAddress: deleteMyAddress,
      placeMyOrder: placeMyOrder,
      
      usersList:usersList,
      userGet:userGet,
      usersDelete:usersDelete,
      usersCreateAddress:usersCreateAddress,
      usersPost:usersPost,
      ordersPost:ordersPost,
      ordersList:ordersList,
      orderGet:orderGet,
      ordersDelete:ordersDelete,
      postAddress:postAddress,
      commentsCreate:commentsCreate
    };
    
  }

})();