(function () {

  angular
    .module('meanApp')
    .controller('istackCtrl', istackCtrl);

  istackCtrl.$inject = ['$window','$swipe', 'jean'];
  
  
  
  function istackCtrl($window, $swipe, jean) {
	  var isvm = this;
		isvm.jean = jean;
		
		isvm.zoom = false;
		
		isvm.pan = "50%,50%";
		
		isvm.trackDrag = function(coords){
			console.log(coords);
			
			frame = angular.element(document.querySelector("#zoom-frame"))[0];
			fWidth = frame.clientWidth;
			fHeight = frame.clientHeight;
			rect = frame.getBoundingClientRect();
			rootDoc = frame.ownerDocument.documentElement;
				//calculate the offset of the frame from the top and left of the document
			offsetT = rect.top + $window.pageYOffset - rootDoc.clientTop
			offsetL = rect.left + $window.pageXOffset - rootDoc.clientLeft

			//calculate current cursor position inside the frame, as a percentage
			xPosition = ((coords.x - offsetL) / fWidth) * 100
			yPosition = ((coords.y - offsetT) / fHeight) * 100

			pan = xPosition + "% " + yPosition + "% 0";
			isvm.pan=pan;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			images.css({"transform-origin":pan});

			
		}
		
		isvm.trackMouse = function($event){
			
			frame = angular.element(document.querySelector("#zoom-frame"))[0];
			fWidth = frame.clientWidth;
			fHeight = frame.clientHeight;
			rect = frame.getBoundingClientRect();
			rootDoc = frame.ownerDocument.documentElement;
			
			//calculate the offset of the frame from the top and left of the document
			offsetT = rect.top + $window.pageYOffset - rootDoc.clientTop
			offsetL = rect.left + $window.pageXOffset - rootDoc.clientLeft

			//calculate current cursor position inside the frame, as a percentage
			xPosition = (($event.pageX - offsetL) / fWidth) * 100
			yPosition = (($event.pageY - offsetT) / fHeight) * 100

			pan = xPosition + "% " + yPosition + "% 0";
			isvm.pan=pan;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			images.css({"transform-origin":pan});
	
		}

			
  }

})();