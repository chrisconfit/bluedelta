(function () {

  angular 
    .module('bdApp')
    .service('accountManagement', accountManagement);

  accountManagement.$inject = ['AWSConfig'];
  
  function accountManagement (AWSConfig) {
		console.log(BlueDeltaApi);
	
		var UserState ={
		  "SignedOut" :0,
		  "SignedIn" :1,
		  "PendingConfirmation" :2,
		  "InvalidCredentials" :3
		}
	
		var IUserRegistration = {
		  "email": "",
		  "givenName": "",
		  "familyName": "",
		  "username": ""
		}
	
		var IUserLogin = {
		  "username": "",
		  "password": ""
		}
	
		var IUserAttribute = {
		  "Name": "",
		  "Value": ""
		}
		
		var CognitoUtil = {
		"_USER_POOL_ID" : AWSConfig['USER_POOL_ID'],
		"_CLIENT_ID" : AWSConfig['CLIENT_ID'],
		"_IDENTITY_POOL_ID" : AWSConfig['IDENTITY_POOL_ID'],
		"_REGION" : AWSConfig['REGION']
	
		}
	}
})();