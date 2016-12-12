(function() {
  
  angular
    .module('meanApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$location', 'meanData'];
  function customizerCtrl($location, meanData) {
    var vm = this;
		
		vm.jean = {}
		vm.form = {};
    vm.form.currentStep = 1;
		vm.form.steps = [];
    vm.form.steps[1] = {
	    "template": "/customizer/form-templates/gender.html",
	    "title" : "Gender"
    };
    vm.form.steps[2] = {
	    "template": "/customizer/form-templates/style.html",
	    "title" : "Style"
    };
    vm.form.steps[3] = {
	    "template": "/customizer/form-templates/build.html",
	    "title" : "Build"
    };

    vm.form.nextStep = function(){
	    vm.form.currentStep =	vm.form.currentStep + 1;
    }
    
  }

})();