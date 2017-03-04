(function () {

  angular
    .module('meanApp')
    .controller('chooserCtrl', chooserCtrl)
	
		chooserCtrl.$inject = ['$scope', '$timeout', '$window','jean'];

		
		function chooserCtrl($scope, $timeout, $window, jean) {
			
			//console.log($scope);
			var chvm = this;
			console.log("data");
			//console.log($scope.dataSet);
			//console.log($scope.step);
			chvm.jean = jean;
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
				DEBUG:					
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
					}
					else clearInterval(scrollInterval); 
		      
	  		},15);
			  
			}
			
			
			
			
		


			chvm.selectAttr = function($event, id, attr, selector){
				var chooser = angular.element(document.querySelector("#"+attr+"-chooser"));
				var selector = angular.element(document.querySelector("#"+attr+"-selector"));
				var top = angular.element($event.target).prop('offsetTop');
				var left = angular.element($event.target).prop('offsetLeft');
				var text = angular.element(document.querySelectorAll('#item-title'));
				
				text.css({'right':'-400px', 'opacity':0});
				selector.css({'top':top+'px', 'left':left+'px'});
				
				if ($window.innerWidth < chvm.breakPoint) scrollToLeft(chooser, left, 200);
				
				$timeout(function(){
					text.css({'right':'15px', 'opacity':1});				
					chvm.jean.data[attr] =	id;	
				}, 200);
			
			}
			
			chvm.jeanSet = function(attr, val){
				chvm.jean.data[attr] =	val;
			}
		
		}	
			
})();