(function() {
  
  angular
    .module('meanApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$filter','$timeout','$location', '$window', 'meanData', 'jean', '$scope', 'popups'];
  function customizerCtrl($filter, $timeout, $location, $window, meanData, jean, $scope, popups) {
    var vm = this;
		
		//Orientation		
		function landscapeDetect() {
		  var ua = navigator.userAgent.toLowerCase();
		  var isAndroid = ua.indexOf("android") > -1; // Detect Android devices
		  if (isAndroid) {
		    //window.orientation is different for iOS and Android
		    if (window.orientation == 0 || window.orientation == 180) { //Landscape Mode
		      return true;
		    }
		    else if (window.orientation == 90 || window.orientation == -90) { //Portrait Mode
					return false;
		    }
		  }
		  else {
		    if (window.orientation == 90 || window.orientation == -90) { //Landscape Mode
		        return true;
		    }
		    else if (window.orientation == 0 || window.orientation == 180) { //Portrait Mode
		        return false;
		    }
		  }
		}
    
    vm.landscape=landscapeDetect();
    window.addEventListener("resize", function() {
	    vm.landscape=landscapeDetect();
		});
		
		//popups
		vm.popups = popups;
		
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

		vm.jean = jean;
		vm.jean.step = (jean.step ? jean.step : 1);

		vm.jean.data.gender=1;
		vm.jean.data.style=2;
		vm.jean.step = 3;
		
    vm.form.nextStep = function(){
	    vm.jean.step =	vm.jean.step + 1;  
    }
    
	  vm.form.selectStyle = function(id){
	    vm.jean.data.style =	id;	    vm.form.nextStep();
    }    

		//Set Defaults
		vm.jean.data.fabric = vm.jean.data.fabric || "1004";
		vm.jean.data.accent_thread = vm.jean.data.accent_thread || "1";
		vm.jean.data.top_thread = vm.jean.data.top_thread || "1";
		vm.jean.data.bottom_thread = vm.jean.data.bottom_thread || "1";
		vm.jean.data.hardware = vm.jean.data.hardware || "1";
	
		
		vm.builder = {};
		
		$scope.drag = function(coords){
			console.log('controller func');
			console.log(coords);
			console.log('why not');
		};
		

		vm.builder.panelDir="next";
		
		vm.builder.panel = [];
		vm.builder.panel[1]={
			"panelTemplate":"fabric-chooser",
			"dataKey":"fabrics",
			"title":"Fabric",
			"jeanKey":"fabric",
			"thumbPrefix":"f"
		};
		vm.builder.panel[2]={
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Top Thread",
			"jeanKey":"top_thread",
			"thumbPrefix":"f"
		};
		vm.builder.panel[3]={
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Bottom Thread",
			"jeanKey":"bottom_thread",
			"thumbPrefix":"f"
		};
		vm.builder.panel[4]={
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Accent Thread",
			"jeanKey":"accent_thread",
			"thumbPrefix":"f"
		};
		vm.builder.panel[5]={
			"panelTemplate":"chooser",
			"dataKey":"hardware",
			"title":"Hardware",
			"jeanKey":"hardware",
			"thumbPrefix":"f"
		};
		vm.builder.panel[6]={
			"panelTemplate":"list",
			"title":"Overview",
			"dataKey":"hardware",
			"jeanKey":"hardware",
			"thumbPrefix":"f"
		};
		
		vm.builder.activeItem = function(){
			var data = vm.builder[vm.builder.panel[vm.builder.step].dataKey];
			var key = vm.jean.data[vm.builder.panel[vm.builder.step].jeanKey];
			return $filter('filter')(data, {id: key})[0];
		}
		
		vm.builder.styleByGender = function(gender){
			return function(style){
				return style["images_"+gender];
		  }
		};
		
		vm.dataLookup = function(jeanKey, id, attr){
			attr = attr||null;
			var dataKey = (jeanKey == "gender" || jeanKey == "style" ? jeanKey+"s" : $filter('filter')(vm.builder.panel, {jeanKey: jeanKey})[0].dataKey);
			var dataSet = vm.builder[dataKey];
			selected = $filter('filter')(dataSet, {id: id})[0];
			if (!attr) return selected;
			else return selected[attr];
			
		}
		vm.builder.getActiveItemName = function(){
			var name = vm.builder.activeItem().name;
			name = name.replace(/Raw Denim/g, "");
			return name;
		}
		vm.builder.step = 1;
		vm.builder.changeStep = function(step){
			
			if (step >= vm.builder.panel.length) return false;
			if (step <= 0) return false;
			if (!step) return false;
			else vm.builder.step = step; 
		}
		
		
		
		

		
		$scope.dir="next";
		
		
		/*				
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
		
	*//*
		vm.builder.jeanSet = function(attr, val){
			 vm.jean.data[attr] =	val;
		}
		
		
		*/
		
		
	
		
	//Gender
  meanData.getGenders()
  .then(function(res){
    vm.builder.genders=res.data;
	});		
	
  //Styles
  meanData.getStyles()
  .then(function(res){
    vm.builder.styles=res.data;
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