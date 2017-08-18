
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
		
		var login = function(username, password, success, error){
			api.login(username, password)
			.success(function(response){
				$window.localStorage.setItem("bdAccessToken", response.access_token);
				setup(function(userData){
					$window.localStorage.setItem("bdUserRole", userData.role_id);
					if (success) success(userData);
				});
			})
			.error(function(err){
				console.log(err);
				if(error) error(err);
			})
		}
		
		var logout = function(){
			$window.localStorage.removeItem("bdAccessToken");
			$window.localStorage.removeItem("bdUserRole");
			user = {};
			$location.path("/login");
		}
	  
	  return {
      get:function(){ return user;},
      isLoggedIn : isLoggedIn,
      isAdmin : isAdmin,
      set: set,
      login:login,
      logout:logout,
      setup: setup,
      getToken, getToken
    };

	}
	
})();
