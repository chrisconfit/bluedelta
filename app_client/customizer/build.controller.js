(function() {
  
  angular
    .module('meanApp')
    .controller('builderCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$location', 'meanData', 'jean'];
  function customizerCtrl($location, meanData, jean) {
    var vm = this;
		vm.jean = jean;
		
		vm.form = {};
    
    vm.jean.step = (jean.step ? jean.step : 1);

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
	    vm.jean.step =	vm.jean.step + 1;
	    
    }
    
  }

})();