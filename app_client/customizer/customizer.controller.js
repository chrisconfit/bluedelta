(function() {
  
  angular
    .module('meanApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$location', 'meanData', 'jean'];
  function customizerCtrl($location, meanData, jean) {
    var vm = this;
		vm.jean = jean;
		vm.jean.step = (jean.step ? jean.step : 1);
	
    
    
		
		
		vm.form = {};		
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
    
	  vm.form.selectStyle = function(id){
	    vm.jean.data.style =	id;
	    vm.form.nextStep();
    }    
    
    
		//vm.jean.data.gender="male";
	//	vm.jean.data.style=1;
//		vm.jean.step=3;
		
		
		vm.builder = {};
		
		vm.builder.controlPanel = [];
		vm.builder.controlPanel[1]="Fabric";
		vm.builder.controlPanel[2]="Hardware";
		vm.builder.controlPanel[3]="Thread";

	
		
		vm.builder.step = 1;
		vm.builder.changeStep = function(step){
			if (!step) return false;
			else vm.builder.step = step; 
		}
		
		vm.builder.selectAttr = function($event, id, attr, selector){
			var selector = angular.element(document.querySelector("#"+attr+"-selector"));
			var top = angular.element($event.target).prop('offsetTop');
			var left = angular.element($event.target).prop('offsetLeft');
			selector.css({'top':top+'px', 'left':left+'px'});
			vm.jean.data[attr] =	id;

		}
		
	
		vm.builder.jeanSet = function(attr, val){
			 vm.jean.data[attr] =	val;
		}
		
  //Styles
  meanData.getStyles()
  .then(function(res){
    vm.styles=res.data;
	});
	
	//Threads
  meanData.getThreads()
  .then(function(res){
    vm.builder.threads=res.data;
	});
	
	
	//Hardware
  meanData.getHardware()
  .then(function(res){
    vm.builder.hardware=res.data;
	});
	
	//Fabrics
  meanData.getFabrics()
  .then(function(res){
    vm.builder.fabrics=res.data;
    console.log(vm.builder.fabrics);
	});
	
		
		
		
  }

})();