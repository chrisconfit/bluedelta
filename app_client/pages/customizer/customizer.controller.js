(function() {
  
  angular
    .module('bdApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$q','$filter','$timeout','$location', '$window', '$routeParams', 'bdAPI', 'jean', '$scope', 'popups', 'aws'];
  function customizerCtrl($q, $filter, $timeout, $location, $window, $routeParams, bdAPI, jean, $scope, popups, aws) {
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
		

		function parseURLkey(key){
			switch(key){
				case "g":
	      return "gender";
	      break;
	      
	      case "s":
	      return "style";
	      break;
	      
	      case "f":
	      return "fabric";
	      break;
	      
	      case "tt":
	      return "top_thread";
	      break;
	      
	      case "tb":
	      return "bottom_thread";
	      break;
	      
	      case "ta":
	      return "accent_thread";
	      
	      default: return false;
			}
		}
		
		function jeanKeytoURL(key){
			switch(key){
				case "gender":
	      return "g";
	      break;
	      
	      case "style":
	      return "s";
	      break;
	      
	      case "fabric":
	      return "f";
	      break;
	      
	      case "top_thread":
	      return "tt";
	      break;
	      
	      case "bottom_thread":
	      return "tb";
	      break;
	      
	      case "accent_thread":
	      return "ta";
	      
	      default: return false;
			}
		}
		
		console.log($routeParams);
		
		//Set up jean data from parameter
		if ($routeParams.jean_id && $routeParams.action=='copy'){
			if ($routeParams.jean_id.indexOf(":")>0){
				jean.createNew();
				jeanData = $routeParams.jean_id.split(":");
				for(var d=0; d<jeanData.length; d++){
					var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
					if (!parts) continue;
					var jeanKey = parseURLkey(parts[1]);
					if (jeanKey) jean.data[jeanKey] = parseInt(parts[2]);					
				}
			}else{
				//Copy Jean from ID	
				jean.createNew($routeParams.jean_id);
			}
			
		//Lookup Jean by Id
		}else if ($routeParams.jean_id && !$routeParams.action){
			//Edit Jean
			bdAPI.jsonData.getJeanById($routeParams.jean_id, function(data){
				if (data){
					jean.data=data;	
				}else{
					//jean id doesn't exist
					jean.createNew();
				}
			});
			
		//New Jean
		}else{
			//New Jean
			if(Object.keys(jean.data).length === 0 && jean.data.constructor === Object){
				jean.createNew();
			}			
		}
		
		vm.jean=jean;
		
		
		
		
		
		
		//SHARE JEAN
		vm.jeanToUrl = function(){
			var url = document.location.origin+"/customizer/d";
			for (var property in vm.jean.data) {
		    if (vm.jean.data.hasOwnProperty(property)) {
					var urlKey = jeanKeytoURL(property);
					if (urlKey) url += ":"+urlKey+vm.jean.data[property];
		    }
			}
			url += "/copy";
			console.log(url);

		}
	
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
			
			var dataKey = (jeanKey == "gender" || jeanKey == "style" ? jeanKey+"s" : $filter('filter')(vm.panel, {jeanKey: jeanKey})[0].dataKey);
			var dataSet = vm.data[dataKey];

			dataById = 	$filter('filter')(dataSet, {id: id});
			if (typeof dataById == 'undefined') return false; //Return false when dataSet is undefined...
			selected = dataById[0];
			
			if (!attr) return selected;
			else return selected[attr];	
			
		}
		
				
		/* GET CUSTOMIZER DATA */
		vm.data = {};
			
		vm.getData = function (func, dataKey) {
			var d = $q.defer();	   
		  bdAPI.jsonData[func]()
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
		
		
		//Thumbnail		
  	function loadImage(src, cntxt) {
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
    
    vm.saveJean = function(){
	    console.log("save");
	    aws.getCurrentUserFromLocalStorage().then(
		    function(result){
			    var userData = result;
			    vm.createThumb().then(
				    function(imageURL){
					  	aws.saveImageTos3(imageURL, userData).then(
					  		function(){
						  		console.log('creds refreshed');
						  	}, 
								function(err){
									console.log(err)
								}
							);
				    }
			    );
		    },
		    function(err){
			    //TODO: properly notify
					alert('you must be logged in to save!');
		    }
	    );
    }
    
    
		vm.createThumb = function(){
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
    
	    var imagesElements = document.getElementsByClassName("zoomed-image");
	    for(var i=0; i<imagesElements.length; i++){
		    var image = imagesElements[i];	
	      promises.push(loadImage(image.src, cntxt));
	    }

	    return $q.all(promises).then(function(results) {
	      var dataUrl = canvas.toDataURL('image/jpeg');
				return dataUrl;
	    });
			
  	}

		
  }

})();