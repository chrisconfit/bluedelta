(function () {

  angular
    .module('meanApp')
    .controller('istackCtrl', istackCtrl);

  istackCtrl.$inject = ['$window', 'jean'];
  
  
  
  function istackCtrl($window, jean) {
	  var isvm = this;
		isvm.jean = jean;
		isvm.centerPan = false;		
		isvm.zoom = false;
		isvm.pan = "0% 30% 0";
		isvm.breakPoint = 800;
		
		
		isvm.toggleZoom = function(){
			left = (isvm.zoom ? "50%" : "0");
			isvm.zoom = !isvm.zoom
			
			var images = angular.element(document.querySelectorAll("#zoom-frame img"));
			images.css('left', left);
			images.css('bottom',"-175px");
			
		}
		isvm.returnPan = function(){
			isvm.pan = "50% 30% 0";	
			isvm.centerPan = true;
			images = angular.element(document.querySelectorAll("#zoom-frame img"));
			
			setTimeout(function(){
				images.css({"transform-origin":isvm.pan});
			}, 200);
		}
		
		
		isvm.drag = function(event){
	     console.log('dragger');
	     console.log(event);
     } 
		 
		 
		
		
		 isvm.scale = 1
	   isvm.xImage = 0; 
		 isvm.yImage = 0;
	   isvm.zoomDrag = {"x":0,"y":0};
	   isvm.dragTracker = {"x":0,"y":0};
	   isvm.yLast = 0;
//	   if (event.isFinal);




		isvm.myDrag = function(u, event) {
			
			//Only run function if we're zoomed in
			if (!isvm.zoom) return false;
			
			var images = angular.element(document.querySelectorAll("#zoom-frame img")),
			windowHeight = window.innerHeight,
			origHeight = images[0].height,
			newHeight = origHeight*1.7,
			frame={
				"width":event.target.clientWidth,
				"height":event.target.clientHeight
			};
			

			//Get drag length
			var drag = {
				"x" : event.deltaX,
				"y" : event.deltaY
			}
			
			//Subtract previous returns of this drag length to get the amount dragged since last return	
			var x = drag.x-isvm.dragTracker.x,
			y = drag.y-isvm.dragTracker.y;

			//Get drag % of container for Transform Origin Only 
			var x = Math.abs(x)/frame.width*100;      
			x = (drag.x<0)?-x:x;	       
			var y = Math.abs(y)/frame.height*100;
			y = (drag.y<0)?-y:y;
			
			//Add these values to the last drag. This essentially allows drag and drop
			x=x+isvm.zoomDrag.x;
			y=y+isvm.zoomDrag.y;
				 
			//Set up max bounds
			var bounds={"y":{},"x":{}}; 

			/*//Left/Right Bounds
			bounds.y.top =(newHeight/2)+175;
			bounds.y.bottom =-(newHeight*.225);
			bounds.x.left = -(event.target.clientWidth-(event.target.clientWidth*.05));
			bounds.x.right = event.target.clientWidth-(event.target.clientWidth*.05);*/
				
			//Transform Origin Bounds
			bounds.y.top    = 90;
			bounds.y.bottom = -90;
			bounds.x.left   = -90;
			bounds.x.right  = 90
				
			if (y>bounds.y.top) y = bounds.y.top;
			if (y<bounds.y.bottom) y = bounds.y.bottom;
			if (x<bounds.x.left) x = bounds.x.left;
			if (x>bounds.x.right) x = bounds.x.right;
			
			//Build Move Objext		
			var move = {"x":x,"y":y}
			
			//Register Drag
			isvm.zoomDrag = move;	 	       
	        
	       
			//Alter transform origin
			var pan = -x + "% " + -y + "% 0";
			images.css({"transform-origin":pan});

			/*//Alter Left/Bottom
			images.css('left', move.x+"px");
			images.css('bottom', -move.y+"px");*/
			
			//When drag is over, reset drag tracker	 
			isvm.dragTracker = event.isFinal ? {"x":0,"y":0} : drag;
				 

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