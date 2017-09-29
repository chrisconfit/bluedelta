'use strict';

angular.module('inspinia')
  .controller('MainController', ['$state', 'user', function ($state, user) {

    var vm = this;
    vm.state = $state;
    vm.user = user.get();
    console.log("USER!!!");
    console.log(vm.user);
    vm.isLoggedIn = user.isLoggedIn(true);
    vm.logout = function(){
	    user.logout();
	    $state.transitionTo('login');
    }

  }]);
