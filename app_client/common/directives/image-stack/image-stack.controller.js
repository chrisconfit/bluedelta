(function () {

  angular
    .module('meanApp')
    .controller('istackCtrl', istackCtrl);

  istackCtrl.$inject = ['$window','$swipe', 'jean'];
  
  
  
  function istackCtrl($window, $swipe, jean) {
	  var isvm = this;
		isvm.jean = jean;
		isvm.centerPan = false;		
		isvm.zoom = false;
		isvm.pan = "0% 30% 0";
		isvm.breakPoint = 800;
		
		isvm.returnPan = function(){
			isvm.pan = "50% 30% 0";	
			isvm.centerPan = true;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			
			setTimeout(function(){
				images.css({"transform-origin":isvm.pan});
			}, 200);
		}
		
		isvm.scanImage = function(x,y){

			setTimeout(function(){
				isvm.centerPan = false;
			}, 200);
			
			frame = angular.element(document.querySelector("#zoom-frame"))[0];
			fWidth = frame.clientWidth;
			fHeight = frame.clientHeight;
			rect = frame.getBoundingClientRect();
			rootDoc = frame.ownerDocument.documentElement;
				//calculate the offset of the frame from the top and left of the document
			offsetT = rect.top + $window.pageYOffset - rootDoc.clientTop
			offsetL = rect.left + $window.pageXOffset - rootDoc.clientLeft

			//calculate current cursor position inside the frame, as a percentage
			xPosition = ((x - offsetL) / fWidth) * 100
			yPosition = ((y - offsetT) / fHeight) * 100
			/*
			console.log(x,y);
			console.log(fWidth);
			console.log(offsetL);
			console.log(x-offsetL);
			console.log(xPosition, yPosition);
			*/
			if ($window.innerWidth < isvm.breakPoint) pan = (100-xPosition) + "% " + (100-yPosition) + "% 0";
			else pan = (xPosition) + "% " + (yPosition) + "% 0";
			isvm.pan=pan;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			images.css({"transform-origin":pan});
		}
		
		isvm.trackMouse = function($event){
			if ($window.innerWidth < isvm.breakPoint) return false;
			isvm.scanImage($event.pageX,$event.pageY);
		}

			
  }

})();