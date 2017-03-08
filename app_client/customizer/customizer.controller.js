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
  	var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

		window.addEventListener(orientationEvent, function() {
		  vm.landscape=landscapeDetect();
		  $scope.$apply();
		}, false);
		
		
		//popups
		vm.popups = popups;
		
		//jean
		vm.jean = jean;
		vm.jean.step = (jean.step ? jean.step : 1);

		vm.jean.data.gender=1;
		vm.jean.data.style=2;
		vm.jean.step = 3;
		
    vm.jean.nextStep = function(){
	    vm.jean.step =	vm.jean.step + 1;  
    }
    
	  vm.jean.selectStyle = function(id){
	    vm.jean.data.style =	id;	    vm.form.nextStep();
    }    

		//Set Defaults
		vm.jean.data.fabric = vm.jean.data.fabric || "1004";
		vm.jean.data.accent_thread = vm.jean.data.accent_thread || "1";
		vm.jean.data.top_thread = vm.jean.data.top_thread || "1";
		vm.jean.data.bottom_thread = vm.jean.data.bottom_thread || "1";
		//vm.jean.data.hardware = vm.jean.data.hardware || "1";
	
		
		vm.data = {};
		
		$scope.drag = function(coords){
			console.log('controller func');
			console.log(coords);
			console.log('why not');
		};
		

		vm.panelDir="next";
		
		vm.panel = [];
		vm.panel.push({
			"panelTemplate":"gender-chooser",
			"dataKey":"genders",
			"title":"Gender",
			"jeanKey":"gender"
		});
		vm.panel.push({
			"panelTemplate":"style-chooser",
			"dataKey":"styles",
			"title":"Style",
			"jeanKey":"style"
		});
		vm.panel.push({
			"panelTemplate":"fabric-chooser",
			"dataKey":"fabrics",
			"title":"Fabric",
			"jeanKey":"fabric"
		});
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Top Thread",
			"jeanKey":"top_thread"
		});
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Bottom Thread",
			"jeanKey":"bottom_thread"
		});
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Accent Thread",
			"jeanKey":"accent_thread"
		});
		/*
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"hardware",
			"title":"Hardware",
			"jeanKey":"hardware"
		});
		*/
		vm.panel.push({
			"panelTemplate":"list",
			"title":"Overview"
		});
		
		vm.panelStep = 0;
		vm.changeStep = function(step){
			if (step >= vm.panel.length) return false;
			if (step < 0) return false;
			if (step===undefined) return false;
			else vm.panelStep = step; 
		}
		
		
		vm.activeItem = function(){
			var data = vm.data[vm.panel[vm.panelStep].dataKey];
			var key = vm.jean.data[vm.panel[vm.panelStep].jeanKey];
			console.log(data,key);
			return $filter('filter')(data, {id: key})[0];
		}
		
		vm.getActiveItemName = function(){
			var name = vm.activeItem().name;
			name = name.replace(/Raw Denim/g, "");
			return name;
		}
		
		vm.styleByGender = function(gender){
			return function(style){
				return style["images_"+gender];
		  }
		};
		
		vm.dataLookup = function(jeanKey, id, attr){
			
			attr = attr||null;
			var dataKey = (jeanKey == "gender" || jeanKey == "style" ? jeanKey+"s" : $filter('filter')(vm.panel, {jeanKey: jeanKey})[0].dataKey);
			var dataSet = vm.data[dataKey];
			selected = $filter('filter')(dataSet, {id: id})[0];
			if (!attr) return selected;
			else return selected[attr];	
		}
		
		
	
	
	
	
	/*
	*   GET CUSTOMIZER DATA
	*/
	
	 	
	//Gender
  meanData.getGenders()
  .then(function(res){
    vm.data.genders=res.data;
	});		
	
  //Styles
  meanData.getStyles()
  .then(function(res){
    vm.data.styles=res.data;
	});
	
	//Threads
  meanData.getThreads()
  .then(function(res){
    vm.data.threads=res.data;
	});
	
	
	//Hardware
  meanData.getHardware()
  .then(function(res){
    vm.data.hardware=res.data;
	});
	
	//Fabrics
  meanData.getFabrics()
  .then(function(res){
    vm.data.fabrics=res.data;
	});
	
		
		
		
  }

})();