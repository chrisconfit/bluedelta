(function () {

  angular
    .module('bdApp')
    .controller('chooserCtrl', chooserCtrl)
	
		chooserCtrl.$inject = ['$scope', '$element','$timeout', '$window', 'jean', 'popups'];

		
		function chooserCtrl($scope, $element, $timeout, $window, jean, popups) {
	
			var chvm = this;
			
			//popups
			chvm.popups = popups.get();
			chvm.jeanData = jean.get();
			chvm.breakPoint = 800;
			
			
			
			function scrollToLeft(el, scrollTo, scrollDuration) {
				//Select First Element
				el = el[0];
				//Center Scroll To
				scrollTo = scrollTo-(el.offsetWidth/2)+40;
				
				var maxLeft = el.scrollWidth - el.offsetWidth;
				
				if (scrollTo >= maxLeft) scrollTo = maxLeft-1;
				if (scrollTo == maxLeft) scrollTo = maxLeft-1;
				var stepNum = Math.ceil(scrollDuration / 15),
						distance = scrollTo - el.scrollLeft,
						scrollStep = (distance / stepNum),
						scrollTest = (el.scrollLeft < scrollTo ? function(a,b){return a<=b-1;} : function(a,b){return a>=b+1;} );		
				/*

				console.log("current Scoll pos: "+el.scrollLeft);
				console.log("Scroll to "+scrollTo);
				console.log("distance to go "+distance);
				console.log(scrollStep);
				console.log("func: "+scrollTest)
				console.log("eval");
				console.log(scrollTest(el.scrollLeft, scrollTo ));
				console.log("done");
				*/
						
				var scrollInterval = setInterval(function(){    
				
					if(scrollTest(el.scrollLeft, scrollTo )){
						var newScroll = el.scrollLeft+scrollStep;
						if (newScroll >= maxLeft) newScroll = maxLeft-1;
						el.scrollLeft = newScroll;
						
						/*
						console.log(newScroll);
						console.log(scrollTo);
						*/
					}
					
					else clearInterval(scrollInterval); 
		      
	  		},15);
			  
			}

			chvm.selectorCoords = {"top":0, "left":0};
			
			
			//Center Selector on chooser change... Center on selected attr if edting preexisting jean...
			$scope.$watch('active', function(newValue,oldValue) {	
				
				//Only on active choosers...
				if (newValue == true){

					$timeout(function(){
						
						//Get the data id 
						var dataId = chvm.jeanData[$scope.step.jeanKey];
					
						//Make sure this isn't an embedded model
						if (typeof(dataId)== 'object') dataId = dataId[$scope.step.dataKey+"Id"];
						
						var elementId = $scope.step.jeanKey+"_"+dataId;												
					
						var activeElement = angular.element(document.querySelector('#'+elementId));
						
						chvm.selectorCoords.top = activeElement.prop('offsetTop');
						chvm.selectorCoords.left = activeElement.prop('offsetLeft');
							
						var selector = angular.element(document.querySelector("#"+$scope.step.jeanKey+"-selector"));
						selector.css({'top':chvm.selectorCoords.top+'px', 'left':chvm.selectorCoords.left+'px'});
						
						//Mobile Choosers
						if ($window.innerWidth < chvm.breakPoint){
							var chooser = angular.element($element[0].querySelector('.chooser-grid'));	
							var left = (chooser[0] ? chvm.selectorCoords.left-(chooser[0].offsetWidth/2)+40 : 0);
							chooser.prop('scrollLeft', left);
						}
						
						//Desktop Choosers
						else{						
							var chooser = angular.element($element[0]);	
							chooser.prop('scrollTop', chvm.selectorCoords.top - 15);
						}
						
					}, 200);
					
				}		
				
    	});


			chvm.selectAttr = function($event, id, attr, selector){
				var chooser = angular.element(document.querySelector("#"+attr+"-chooser"));
				var selector = angular.element(document.querySelector("#"+attr+"-selector"));
				var top = angular.element($event.target).prop('offsetTop');
				var left = angular.element($event.target).prop('offsetLeft');
				var text = angular.element(document.querySelectorAll('#item-title'));
				
				text.css({'right':'-400px', 'opacity':0});
				selector.css({'top':top+'px', 'left':left+'px'});
				
				chvm.selectorCoords = {"top":top,"left":left};
				
				if ($window.innerWidth < chvm.breakPoint) scrollToLeft(chooser, left, 200);
				
				$timeout(function(){
					text.css({'right':'15px', 'opacity':1});				
					chvm.jeanData[attr] =	id;	
				}, 200);
			
			}
			
			chvm.jeanSet = function(attr, val){
				chvm.jeanData[attr] =	val;
			}
		
		}	
			
})();