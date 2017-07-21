(function() {
  
  angular
    .module('bdApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$q','$filter','$timeout','$location', '$window', '$routeParams', 'bdAPI', 'jean', '$scope', 'popups', 'aws', 'jsonData', 'messages', 'loader'];
  function customizerCtrl($q, $filter, $timeout, $location, $window, $routeParams, bdAPI, jean, $scope, popups, aws, jsonData, messages, loader) {
	  
    
    var vm = this;
		
		//Setup Loader		
		vm.loader = loader.get();
		
		//Set up shared messages service
		messages.reset();
		vm.messages=messages.get();
	
		//Set up shared popups service
		popups.closeAll();
		vm.popups = popups.get();
		
		//Set up Jean
		jean.setup().then(function(result){
			vm.jean = jean.get();
			
			$scope.$watch(function() {
				return vm.jean.data;
			}, function(current, original) {
				vm.updateActiveItem();
			}, true);
			
			$scope.$watch(function() {
				return vm.data;
			}, function(current, original) {
				vm.updateActiveItem();
			}, true);
			
		})
		
	

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
		
		
		
		
    /*
		*
		* GET CUSTOMIZER DATA 
		*
		*/	
		vm.data = jsonData.getData();
		

		vm.activeItem={};
		vm.updateActiveItem = function(){
			if (!vm.jean) return false;
			var data = vm.data[vm.panel[vm.panelStep].dataKey];
			var key = vm.jean[vm.panel[vm.panelStep].jeanKey];
			var ret = $filter('filter')(data, {id: key});
			if (ret) ret = ret[0];
			vm.activeItem = ret||null;
		}

		
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
		

		


				
		/*
		*
		* Control Panel actions
		*
		*/
		vm.orderCallback = function(){
			vm.saveCallback(function(){
				$location.path('/order')
			});
		}		
		
		vm.placeOrder=function(){
			if(!aws.isLoggedIn()){
				vm.authCallback = vm.orderCallback;
				popups.set('loginOrRegister',true);
				return false;
			}
			else {
				vm.saveCallback(function(){
					$location.path('/order')
				});
			}
		}

		vm.savingBar = false;
			
    vm.saveCallback = function(callback){
	    popups.closeAll();
			vm.savingBar = true;
			jean.save().then(function(result){
				vm.savingBar = false;
				var userData = aws.getCurrentUserFromLocalStorage();
				var identityId = bdAPI.setupHeaders(userData);
				$location.path('/customizer/'+vm.jean.jeanId+'/'+identityId);
				if (callback) callback(result);
			});
    }
    
    vm.saveJean = function(){
			if(!aws.isLoggedIn()){
				vm.authCallback = vm.saveCallback;
				popups.set('loginOrRegister',true);
				return false;
			}
			else{
		  	vm.saveCallback();
    	}
  	}
    
    //Set default auth callback
		vm.authCallback = vm.orderCallback;
    
    
    
    


		
  }

})();