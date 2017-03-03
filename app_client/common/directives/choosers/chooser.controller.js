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
				
				var stepNum = Math.ceil(scrollDuration / 15),
						distance = (scrollTo - el.scrollLeft),
						scrollStep = distance / stepNum;
						scrollTest = (scrollTo < el.scrollLeft ? function(a,b){return a>=b;} : function(a,b){return a<=b;} ),
						scrollInterval = setInterval(function(){    
			    if(scrollTest(el.scrollLeft, scrollTo )) el.scrollLeft = el.scrollLeft+scrollStep;
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
				
				if ($window.innerWidth < $scope.breakPoint) scrollToLeft(chooser, left, 200);
				
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