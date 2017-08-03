'use strict';

angular.module('inspinia')
  .controller('MainController', ['$state', 'aws', function ($state, aws) {
		
		
    var vm = this;
    vm.userName = 'Example user';
    vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';
    vm.logout = function(){
	    aws.signCurrentUserOut();
	    $state.transitionTo('login');
    }

  }]);
