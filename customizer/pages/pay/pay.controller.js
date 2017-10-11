(function() {
  
  angular
    .module('bdApp')
    .controller('payCtrl', payCtrl);

    payCtrl.$inject = ['$routeParams', 'user', 'api'];


		
    function payCtrl ($routeParams, user, api) {


      var vm = this;
      vm.user = user.get();
      vm.orderErr = false;
      vm.checkoutForm = {};

      if ($routeParams.orderId){
        api.call('getMyOrders', $routeParams.orderId, function(result){

          if (result.price){
            vm.order= result;
            vm.checkoutForm.price = result.price;
          }
          else vm.orderErr = "Sorry, but this order is not ready for payment";
        }, function(err){
          if (err.status==404) vm.orderErr = "Sorry, but you don't have an Order #"+$routeParams.orderId;
        });
      }else{
        vm.orderErr = "No Order Id or Fit Match details provided";
      }

    }

})();