'use strict';

angular.module('inspinia')
  .controller('MainController', ['$state', 'user', function ($state, user) {

    var vm = this;
    
    vm.state = $state;
    console.log("STAE");
    console.log(vm.state.current)
    vm.user = user.get();
    vm.isLoggedIn = user.isLoggedIn();
    vm.logout = function(){
	    user.logout();
	    $state.transitionTo('login');
    }

  }]);
