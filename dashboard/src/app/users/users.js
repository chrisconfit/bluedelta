'use strict';

angular.module('inspinia')
  .controller('UsersController', ['bdAPI', '$scope', 'aws', 'DTColumnDefBuilder', function (bdAPI, $scope, aws, DTColumnDefBuilder) {


		
		console.log(bdAPI);

		console.log("let's get some more orders...");
    var vm = this;
    
    vm.orders = {};
    
    aws.authenticateCognitoUser("chris@confitdesign.com","Go@tboy4535").then(
			function(result){
				console.log(result);
				
				var id = bdAPI.setupHeaders();
				bdAPI.usersList().then(
				function(result){
					console.log(result);
					vm.users = result.data.items;
					$scope.$apply();
				}, 
				function(err){console.log(err)} 
			);
					
				
				
			},
			
			
			function(err){
				if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
				messages.set(err.message,"error");
			}
			
		);
    
    
   $scope.dtColumnDefs = [
   	DTColumnDefBuilder.newColumnDef(3).notSortable(),
	 	DTColumnDefBuilder.newColumnDef(2).notSortable()
	 ];
    		
        


		

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

  }]);
