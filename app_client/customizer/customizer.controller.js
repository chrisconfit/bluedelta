(function() {
  
  angular
    .module('meanApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$timeout','$location', '$window', 'meanData', 'jean'];
  function customizerCtrl($timeout, $location, $window, meanData, jean) {
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
    
    

		//Set Defaults
		vm.jean.data.fabric = vm.jean.data.fabric || "1000";
		vm.jean.data.threadAccent = vm.jean.data.threadAccent || "1";
		vm.jean.data.threadTop = vm.jean.data.threadTop || "1";
		vm.jean.data.threadBottom = vm.jean.data.threadBottom || "1";
		
		
		vm.builder = {};
		
		vm.builder.controlPanel = [];
		vm.builder.controlPanel[1]={
			"dataKey":"fabrics",
			"title":"Fabric",
			"jeanKey":"fabric",
			"thumbPrefix":"f"
		};
		vm.builder.controlPanel[2]={
			"dataKey":"threads",
			"title":"Top Thread",
			"jeanKey":"threadTop",
			"thumbPrefix":"f"
		};
		vm.builder.controlPanel[3]={
			"dataKey":"threads",
			"title":"Bottom Thread",
			"jeanKey":"threadBottom",
			"thumbPrefix":"f"
		};
		vm.builder.controlPanel[4]={
			"dataKey":"threads",
			"title":"Accent Thread",
			"jeanKey":"threadAccent",
			"thumbPrefix":"f"
		};
		vm.builder.controlPanel[5]={
			"dataKey":"hardware",
			"title":"Hardware",
			"jeanKey":"hardware",
			"thumbPrefix":"f"
		};
		
//		vm.builder.threadSubSelect = vm.builder.threadSubSelect || "Top";
		
		
		vm.builder.getActiveItemName = function(){
			var data = vm.builder[vm.builder.controlPanel[vm.builder.step].dataKey];
			var key = vm.jean.data[vm.builder.controlPanel[vm.builder.step].jeanKey];
			return data[key].name;
		}
		vm.builder.step = 1;
		vm.builder.changeStep = function(step){
			if (!step) return false;
			else vm.builder.step = step; 
		}
		
		
		
		
	vm.builder.zoom = false;
		/*
		vm.builder.zoomLevel = 1;
		vm.builder.toggleZoom = function(){
			vm.builder.zoomLevel = vm.builder.zoomLevel + 1
			if (vm.builder.zoomLevel > 3) vm.builder.zoomLevel=1;
		}
		*/
		//zoomlvl = (scope.zoomlvl === undefined) ? "2.5" : scope.zoomlvl

		//
		
		vm.builder.pan = "50%,50%";
		vm.builder.trackMouse = function($event){
			frame = angular.element(document.querySelector("#zoom-frame"))[0];
			fWidth = frame.clientWidth;
			fHeight = frame.clientHeight;
			rect = frame.getBoundingClientRect();
			rootDoc = frame.ownerDocument.documentElement;
			
			//calculate the offset of the frame from the top and left of the document
			offsetT = rect.top + $window.pageYOffset - rootDoc.clientTop
			offsetL = rect.left + $window.pageXOffset - rootDoc.clientLeft

			//calculate current cursor position inside the frame, as a percentage
			xPosition = (($event.pageX - offsetL) / fWidth) * 100
			yPosition = (($event.pageY - offsetT) / fHeight) * 100

			pan = xPosition + "% " + yPosition + "% 0";
			vm.builder.pan=pan;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			images.css({"transform-origin":pan});
	
		}
		
		/*
		vm.builder.resetPan = function(){
			pan = "50% 50% 0";
			vm.builder.pan=pan;
			images = angular.element(document.querySelectorAll(".z-img"));
			images.css({"transform-origin":pan});
		}
		*/

		
		vm.builder.selectAttr = function($event, id, attr, selector){
			var selector = angular.element(document.querySelector("#"+attr+"-selector"));
			var top = angular.element($event.target).prop('offsetTop');
			var left = angular.element($event.target).prop('offsetLeft');
			var text = angular.element(document.querySelectorAll('#item-title'));
			
			text.css({'right':'-400px', 'opacity':0});
			selector.css({'top':top+'px', 'left':left+'px'});
			$timeout(function(){
				text.css({'right':'15px', 'opacity':1});				
				vm.jean.data[attr] =	id;	
			}, 200);
			

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
	});
	
		
		
		
  }

})();