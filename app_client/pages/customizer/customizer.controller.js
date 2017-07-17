(function() {
  
  angular
    .module('bdApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$q','$filter','$timeout','$location', '$window', '$routeParams', 'meanData', 'jean', '$scope', 'popups'];
  function customizerCtrl($q, $filter, $timeout, $location, $window, $routeParams, meanData, jean, $scope, popups) {
    var vm = this;
		

		//Detect Orientation		
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
			//Set a scope variable on orientation change. This will display a popup on the front end warning users that the customizer works best in protrait mode
		  vm.landscape=landscapeDetect();
		  $scope.$apply();
		}, false);
		
		
		//popups
		vm.popups = popups;
		
	

		//Set up jean data from parameter
		if ($routeParams.jean_id && $routeParams.action=='copy'){
			//Copy Jean
			jean.createNew($routeParams.jean_id);
			
		}else if ($routeParams.jean_id && !$routeParams.action){
			//Edit Jean
			meanData.getJeanById($routeParams.jean_id, function(data){
				jean.data=data;
			});
			
		}else{
			//New Jean
			if(Object.keys(jean.data).length === 0 && jean.data.constructor === Object){
				jean.createNew();
			}			
		}
		
		vm.jean=jean;
		
	
    /*
	  vm.jean.selectStyle = function(id){
	    vm.jean.data.style =	id;	   
	    //vm.form.nextStep();
    }    
		*/

		
		//Build Control Panel Steps
		vm.panel = [];
		
		//Gender
		vm.panel.push({
			"panelTemplate":"gender-chooser",
			"dataKey":"genders",
			"title":"Gender",
			"jeanKey":"gender"
		});
		
		//Style
		vm.panel.push({
			"panelTemplate":"style-chooser",
			"dataKey":"styles",
			"title":"Style",
			"jeanKey":"style"
		});
		
		//Fabric
		vm.panel.push({
			"panelTemplate":"fabric-chooser",
			"dataKey":"fabrics",
			"title":"Fabric",
			"jeanKey":"fabric"
		});
		
		//Top Thread
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Top Thread",
			"jeanKey":"top_thread"
		});
		
		//Bottom Thread
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Bottom Thread",
			"jeanKey":"bottom_thread"
		});
		
		//Accent Thread
		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"threads",
			"title":"Accent Thread",
			"jeanKey":"accent_thread"
		});
		
		//Overview
		vm.panel.push({
			"panelTemplate":"list",
			"title":"Overview"
		});
		
		
		/*
		Not using hardware for now...

		vm.panel.push({
			"panelTemplate":"chooser",
			"dataKey":"hardware",
			"title":"Hardware",
			"jeanKey":"hardware"
		});
		*/
		
		vm.panelDir="next";		
		vm.panelStep = 0;
		vm.changeStep = function(step){
			if (step >= vm.panel.length) return false;
			if (step < 0) return false;
			if (step===undefined) return false;
			else vm.panelStep = step; 
			
			//As long as we're not on the "Overview" Step, update active item...
			if (step+1 != vm.panel.length) vm.updateActiveItem();
		}
		
		vm.activeItem={};
		
		vm.updateActiveItem = function(){
			var data = vm.data[vm.panel[vm.panelStep].dataKey];
			var key = vm.jean.data[vm.panel[vm.panelStep].jeanKey];
			var ret = $filter('filter')(data, {id: key})[0];
			vm.activeItem = ret;
		}
		
		vm.styleByGender = function(gender){
			return function(style){
				return style["images_"+gender];
		  }
		};
		
				
		vm.dataLookup = function(jeanKey, id, attr){
			
			if (typeof jeanKey == 'undefined' || typeof id == 'undefined') return false;
			attr = attr||null;
			
			var dataInfo = $filter('filter')(vm.panel, {jeanKey: jeanKey});

			if (dataInfo.length < 1) return false; //Return false for the "List" Panel
			
		//	console.log(dataKey);
			
			var dataKey = (jeanKey == "gender" || jeanKey == "style" ? jeanKey+"s" : $filter('filter')(vm.panel, {jeanKey: jeanKey})[0].dataKey);
			var dataSet = vm.data[dataKey];

			dataById = 	$filter('filter')(dataSet, {id: id});
			if (typeof dataById == 'undefined') return false; //Return false when dataSet is undefined...
			selected = dataById[0];
			
			console.log(selected);
			if (!attr) return selected;
			else return selected[attr];	
			
		}
		
				
		/* GET CUSTOMIZER DATA */
		vm.data = {};
			
		vm.getData = function (func, dataKey) {
			var d = $q.defer();	   
		  meanData[func]()
		  .then(function(res){
		    vm.data[dataKey]=res.data;
		    d.resolve(true);
			});
			return d.promise;
		}
		
		//Make sure that all data is in place before running updateActiveItem
		$q.all([
			vm.getData('getGenders', 'genders'),
			vm.getData('getStyles', 'styles'),
			vm.getData('getFabrics', 'fabrics'),
			vm.getData('getThreads', 'threads'),
		]).then(function(data) {
		
			//Update the active item any time the jean data changes
			$scope.$watch(function() {
			  return vm.jean.data;
			}, function(current, original) {
				vm.updateActiveItem();
			}, true);
			
		});
		
		
		vm.createThumb = function(){
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
			
	    function loadImage(src) {
        return $q(function(resolve,reject) {
          var image = new Image();
          image.src = src;
          image.onload = function() {
            cntxt.drawImage(image,0,0,600,696);
            resolve(image);
          };
          image.onerror = function(e) {
            reject(e);
          };
        })
	    }
	    
	    var imagesElements = document.getElementsByClassName("zoomed-image");
	    for(var i=0; i<imagesElements.length; i++){
		    var image = imagesElements[i];	
	      promises.push(loadImage(image.src));
	    }

	    return $q.all(promises).then(function(results) {
	      var dataUrl = canvas.toDataURL('image/jpeg');
	      window.open(dataUrl);
	    });
			
  	}

		
  }

})();