
(function() {

  angular
    .module('bdApp')
    .service('user', user);
		
	user.$inject = ['api'];
  function user(api) {
	  
	  var user = {isLoggedIn:false};
	  
		var set = function(key, data){
      user[key] = data; 
      return user;
    };
		
		var __setup_user function(data){
			set("username", "cplefevre");
			set("isLoggedIn", true);
		}

				
		var login = function(email, password){
			api.call("login", [email,password], function(data){
			__setup_user(data);
			});
		}
		
		var logout = function(){
			api.call("logout", null, function(){
				user = {}
			});
		}
	  
	  return {
      get:function(){ return user;},
      set: set,
      login:login,
      logout:logout
    };
    
  }

})();