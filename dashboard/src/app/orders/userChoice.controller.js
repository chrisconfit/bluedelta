'use strict';

angular.module('inspinia')
  .controller('UserChoiceController', ['$scope', '$uibModalInstance', 'orderUser', 'order', 'saveOrder', 'bdAPI',
  function ($scope, $uibModalInstance, orderUser, order, saveOrder, bdAPI) {
		$scope.users=[];
		
		$scope.order = order;
		$scope.orderUser = orderUser;
		
	
		$scope.searchClient="";
		$scope.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		}
		bdAPI.call('usersList', 50, function(result){
			console.log(result.data);
			$scope.clients=result.data.items;
			$scope.$apply();
		});
		
		$scope.chooseClient = function (client) {
			for (var prop in client){ $scope.orderUser[prop] = client[prop]; }
			$scope.order.userId = client.identityId;
			$scope.order.shippingAddress = client.address[0];
      $uibModalInstance.close();
    };
		
		

}]);