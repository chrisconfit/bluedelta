
(function() {

  angular
    .module('user', ['api'])
    .service('user', user);

  user.$inject = ['$location', '$window', 'api'];
  function user($location, $window, api) {

	 var user = {};
	 	
	  var isAdmin = function(){ return $window.localStorage.getItem("bdUserRole") > 0 ? true : false; }
		var isLoggedIn = function(){ return $window.localStorage.getItem("bdAccessToken") ? true : false; }
	  var getToken = function(){ return $window.localStorage.getItem("bdAccessToken"); }
	  
		var set = function(key, data){
			
			if (key == null) return false;
			
			if (typeof key === 'object'){
				
				var userData = key;
				for (obKey in userData){
        if(!userData.hasOwnProperty(obKey)) continue;
					user[obKey] = key[obKey]
    		}					
			}
			
			else user[key] = data; 
      return user;
    };
		
		var setup = function(callback){
			api.call('getCurrentUser', {}, function(userDetails){
				$window.localStorage.setItem("userRole", userDetails.roleId);
				set(userDetails);
				if (callback) callback(userDetails);
			});
		}
		
		
		function authCallback(response, callback){
			$window.localStorage.setItem("bdAccessToken", response.access_token);
			setup(function(userData){
				$window.localStorage.setItem("bdUserRole", userData.role_id);
				if (callback) callback(userData);
			});
		}
		
		var login = function(username, password, success, error){
			var userData =  {
				username:username, 
				password:password
			}
			api.call('login', userData, function(response){
				authCallback(response, success);
			}, function(err){
				if(error) error(err);
			});
		}
		
		var register = function(username, password, first_name, last_name, success, error){
			var userData = {
				email:username,
				password:password,
				first_name:first_name,
				last_name:last_name
			};
			console.log("user register");
			console.log(userData);
			
			api.call('register', userData, function(response){
				authCallback(response, success);
			}, function(err){
				if(error) error(err);
			});		
		}
		
		var logout = function(){
			$window.localStorage.removeItem("bdAccessToken");
			$window.localStorage.removeItem("bdUserRole");
			user = {};
			$location.path("/login");
		}
		
		var update = function(userData, success, error){
			api.call('updateMe', userData, success, error);
		}
	  
	  return {
      get:function(){ return user;},
      isLoggedIn : isLoggedIn,
      isAdmin : isAdmin,
      set: set,
      login:login,
      register:register,
      update: update,
      logout:logout,
      setup: setup,
      getToken: getToken,
    };

	}
	
})();
