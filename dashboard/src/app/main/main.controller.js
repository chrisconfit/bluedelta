'use strict';

angular.module('inspinia')
  .controller('MainController', ['$state', 'aws', 'user', function ($state, aws, user) {

    var vm = this;
    
    vm.state = $state;
    vm.user = user.get();
    vm.isLoggedIn = user.isLoggedIn();
    console.log(vm.user);
    vm.logout = function(){
	    user.logout();
	    $state.transitionTo('login');
    }

  }]);
