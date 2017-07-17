(function () {

  angular
    .module('bdApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'aws', '$q'];
  function authentication ($http, $window, aws, $q) {

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

    

    


//		console.log(aws.authenticateCognitoUser('cplefevre', 'ConfitConfit@123'));

		var register = function(userDetails){
			//console.log(userDetails);
		//	console.log(aws.signupForApplication('hello@confitdesign.com', 'ConfitConfit@123'));	
		}
    

		
    

    login = function(user) {
	    
	    aws.authenticateCognitoUser(user, password);
		};

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    return {
      //userAttrList: userAttrList,
      //createUserAttributeList: createUserAttributeList,
      //userPool: userPool,
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