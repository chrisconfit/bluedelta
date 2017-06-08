(function () {

  angular
    .module('bdApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication', 'aws'];
  function registerCtrl($location, authentication, aws) {
    var vm = this;

    
    // console.log("userPool from registerCtrl => ", userPool);

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.errors = {
			message : ""
		}

    vm.onSubmit = function () {
      /*
       awsConfig.userDetailObj = aws.updateUserDetailObj(awsConfig.userDetailObj, vm.credentials);
       awsConfig.userAttrList  = aws.updateUserAttrList(awsConfig.userAttrList, );

       */


      var userAttrList;
      /*
        PSEUDO

        authentication.userAttrList = authentication.userAttrList.map(attrObj => {
          for ( var key in vm.credentials) {
            if (attrObj[key]) {
              attrObj[key] = vm.credentials[key];
            }
          }
          return attrObj;
        })


      */
      


      userAttrList = authentication.createUserAttributeList(vm.credentials, awsConfig.acceptedCognitoFields);
      console.log(userAttrList);
      
      // original code below
      console.log('Submitting registration');
      
      //authentication
        //.register(authentication.userPool, vm.credentials.email, vm.credentials.password, userAttrList);
        // .error(function(err){
        //   //alert(err);
        //   console.log(err);
        //   vm.errors.message = err.message;
        // })
        // .then(function(){
        //   $location.path('profile');
        // });
    };

  }

})();