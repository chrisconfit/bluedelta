(function() {
  
  angular
    .module('meanApp')
    .controller('builderCtrl', builderCtrl);

  builderCtrl.$inject = ['$location', 'meanData', 'jean'];
  function builderCtrl($location, meanData, jean) {
    var vm = this;
		vm.jean = jean;
		
		console.log('starting');
		
		vm.build = {};
		vm.build.steps = [];
		vm.build.steps.push("Fabric");
		vm.build.steps.push("Hardware");
		vm.build.steps.push("Thread");
		vm.build.steps.push("Length");
		
		console.log(vm.build.steps);
		vm.vari = "THIS VAR";
    
    
  }

})();