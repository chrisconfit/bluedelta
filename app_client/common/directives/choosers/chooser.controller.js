(function () {

  angular
    .module('meanApp')
    .controller('chooserCtrl', chooserCtrl)
	
		chooserCtrl.$inject = ['$scope', '$timeout', 'jean'];

		
		function chooserCtrl($scope, $timeout, jean) {
			
			//console.log($scope);
			var chvm = this;
			console.log("data");
			//console.log($scope.dataSet);
			//console.log($scope.step);
			chvm.jean = jean;
			
			
			function getStyle(oElm, strCssRule){
		    var strValue = "";
		    if(document.defaultView && document.defaultView.getComputedStyle){
		        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		    }
		    else if(oElm.currentStyle){
		        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
		            return p1.toUpperCase();
		        });
		        strValue = oElm.currentStyle[strCssRule];
		    }
		    return strValue;
			}
			
			function scrollToLeft(el, scrollTo, scrollDuration) {

				//Select First Element
				el = el[0];
				
				//Center Scroll To
				scrollTo = scrollTo-(el.offsetWidth/2)+40;
				

				var stepNum = Math.ceil(scrollDuration / 15),
						distance = (scrollTo - el.scrollLeft),
						scrollStep = distance / stepNum; 
				
				scrollTest = (scrollTo < el.scrollLeft ? function(a,b){return a>=b;} : function(a,b){return a<=b;} );
								
			  var scrollInterval = setInterval(function(){    
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
				scrollToLeft(chooser, left, 400);
				
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