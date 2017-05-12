(function () {

  angular
    .module('bdApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

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
    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      // return $http.post('/api/login', user).success(function(data) {
      //   saveToken(data.token);
      // });
      const userPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_LOGu3QxlG',
        ClientId: '722lmps6diglhvjek6gmrk4g69'
      });
      const authenticationData = {
        Username: user.email,
        Password: user.password
      };

      const cognitoUser = new CognitoUser({ Username: user.email, Pool: userPool });
      const authenticationDetails = new AuthenticationDetails(authenticationData);

      return new Promise( function (resolve, reject) {
        cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: function (result) { resolve(result.getIdToken().getJwtToken()); },
              onFailure: function (err) { reject(err); }
        })
      });
    };

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
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