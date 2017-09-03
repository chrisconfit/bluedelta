'use strict';

angular.module('inspinia')
  .controller('UserChoiceController', ['$scope', '$uibModalInstance', 'orderUser', 'choose', 'api',
  function ($scope, $uibModalInstance, orderUser, choose, api) {
		$scope.users=[];
		
		$scope.orderUser = orderUser;
	
		$scope.searchClient="";
		$scope.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.totalClients = 9999;
		
		function pullUsers(filters, callback){
			api.call('usersList', filters, function(result){
				console.log(result);
				$scope.clients.push.apply($scope.clients, result.results);
				$scope.totalClients = result.total;
				if (callback) callback();
			});
		};
		
		$scope.clients = [];
		$scope.filters = {
			"results_per_page" : 100,
			"page": 1, 
			"orderby":"last_name",
			"order":"ASC",
		};
		
		pullUsers($scope.filters);    
		
		$scope.getMoreUsers = function(){
			$scope.filters.page++;
			pullUsers($scope.filters);
		};
		
		$scope.filterSearch = function(){
			$scope.clients=[];
			$scope.filters.page = 1;
			pullUsers($scope.filters);
		};

		$scope.chooseClient = function (client) {
			choose(client);
			$uibModalInstance.close();
    };
		
		

}]);