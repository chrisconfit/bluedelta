(function() {
  
  angular
    .module('bdApp')
    .controller('fmCtrl', fmCtrl);
  
  fmCtrl.$inject = ['$scope', '$routeParams', 'user', 'api', 'apiData', '$location'];
  
  function fmCtrl ($scope, $routeParams, user, api, apiData, $location) {
    
    var vm = this;
    vm.userLoggedIn = user.isLoggedIn();
    vm.user = user.get();
    vm.user.loaded = !vm.userLoggedIn;
    vm.checkoutForm = {};
    vm.data = apiData;
    vm.user = user.get();
    vm.add = {};
    vm.formStep=1;
    vm.fitMatch = $routeParams.orderDetails.split("-");
    vm.cards = null;
    vm.cardForm = {
      addingCard:false,
      loadingCards:true
    };
    
    vm.authCallback = function(){
      vm.user=user.get();
      vm.userLoggedIn = user.isLoggedIn();
    };
    
    vm.logout = function(){
      user.logout(function(){
        vm.user = {};
        vm.user.loaded=true;
        vm.userLoggedIn = user.isLoggedIn();
        
      }, false)
    };
    vm.fire = function(){};
    
    //After User is init'd
    $scope.$watch(function() {
      return vm.user;
    }, function(current, original) {
      //Make sure we've pulled a user...
      if(!vm.user.id) return false;
      //Only run this once..
      if(vm.user.loaded) return false;
      
      vm.user.loaded = true;
      
      //Set primary address to shipping address
      if(vm.user.addresses.length){
        for(i=0; i<vm.user.addresses.length; i++){
          if(vm.user.addresses[i].primary){
            vm.add = vm.user.addresses[i];
            break;
          }
        }
      }
      
      //Pull Credit Cards
      if(current.square_id){
        vm.cardForm.loadingCards = true;
        api.call('getMyCreditCards', null, function(cards){
          if (cards.length<1){
            vm.cardForm.addingCard=true;
          }else{
            vm.cards = cards;
          }
          vm.cardForm.loadingCards = false;
        });
      }else if(current.id && !current.square_id){
        vm.cardForm.addingCard=true;
        vm.cardForm.loadingCards=false;
      }
    }, true);
    
    vm.inputConfigOverrides = {
      cardNumber: {placeholder: ''},
      cvv: {placeholder: ''},
      expirationDate: {placeholder: ''},
    };
    
    vm.inputStyles = [
      {
        backgroundColor: '#e8edef',
        padding: '10px',
        fontSize: '20px',
        lineHeight: '20px',
      }
    ];
    
    /*
    $scope.$watch(function() {
      return vm.add;
    }, function(current) {
      console.log(current.id);
    }, true);
    */
    
    //Create CC from nonce and place order
    vm.nonceReceived =  function(nonce, err){
      api.call('createMyCreditCard', {'nonce':nonce}, function(card){
        vm.orderFitMatch(card.card_id);
      });
    };
    
    vm.orderFitMatch = function(card){
      var fmObject = {
        "credit_card_id":card,
        "shipping_address_id":vm.add.id,
        "requested_fabric_ids":JSON.stringify(vm.fitMatch)
      };
      api.call('createMyFitMatch', fmObject, function(){
        $location.path('/thank-you/fitmatch');
      });
      
    };
    
    
    
    
    
    
  }
  
})();