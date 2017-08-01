
(function() {

  angular
    .module('bdApp')
    .service('account', account);
		
	account.$inject = ['aws', '$window'];
  function account(aws, $window) {
	  
	  
		console.log('init');
		
		isLoggedIn = $window.localStorage.isLoggedIn;
		
		var setUpUser = function(){
			console.log('somone ran setup');
			aws.getCurrentUserFromLocalStorage().then(
				function(result){
					console.log('we have one');
					if (result.accessToken != "") var isLoggedIn = true;
				},
				function(err){
					console.log(err);
					var isLoggedIn = false;
				}
			);
		}
		
		var getLoggedInStatus = function(){
			console.log(isLoggedIn);
			return isLoggedIn;
		}
		
		setUpUser();

    return {
      isLoggedIn : isLoggedIn,
      setUpUser : setUpUser
    };
    
  }

})();