(function () {

  angular
    .module('bdApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'aws', 'awsConfig'];
  function authentication ($http, $window, aws, awsConfig) {

    
  
    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        console.log(token);
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

		
		var isAdmin = function(){
			if(isLoggedIn()){
        var token = getToken();

        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        console.log(payload);
        var roles = payload.permissions;
				return roles.indexOf('admin') !== -1;
      }
		}

    

    



    

		
    

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      userAttrList: userAttrList,
      createUserAttributeList: createUserAttributeList,
      userPool: userPool,
	    isAdmin : isAdmin,
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();