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




		 isvm.myDrag = function(s, event) {
			 var images = angular.element(document.querySelectorAll("#zoom-frame img"));
			// console.log('imgdata');
			// console.log(images);
			// console.log(images[0].height);
			 
			 var frame={
				 "width":event.target.clientWidth,
				 "height":event.target.clientHeight
			 }

			 var windowHeight = window.innerHeight;
			 var line = windowHeight - 175;
			 
			 var origHeight = images[0].height;
			 var newHeight = origHeight*1.7;
			 var bounds={"y":{},"x":{}};
			 console.log(newHeight);
			 bounds.y.bottom =-(newHeight*.225);
			 bounds.y.top =(newHeight/2)+175;
			 bounds.x.left = -(event.target.clientWidth-(event.target.clientWidth*.05));
			 bounds.x.right = event.target.clientWidth-(event.target.clientWidth*.05);
			// console.log('image');
			 //console.log(yBoundBottom);
console.log(bounds.y);

//			console.log(imageHeight*1.7);
			if (!isvm.zoom) return false;


			
			//	console.log(event);
//		var frame
			
				
				//Get drag length
				var drag = {
					"x" : event.deltaX,
					"y" : event.deltaY
				}
				
				var x = drag.x-isvm.dragTracker.x;
				var y = drag.y-isvm.dragTracker.y;

			//	console.log(x,y);
	       
	       //Get % for move
	       //var x = Math.abs(x)/frame.width*100;      
	      // x = (drag.x<0)?-x:x;	       
	       //var y = Math.abs(y)/frame.height*100;
	       //y = (drag.y<0)?-y:y;
				 
				 x=x+isvm.zoomDrag.x;
				 y=y+isvm.zoomDrag.y
				 
				 console.log(y);
				 
				 
				 if (y>bounds.y.top) y = bounds.y.top;
				 if (y<bounds.y.bottom) y = bounds.y.bottom;
				 if (x<bounds.x.left) x = bounds.x.left;
				 if (x>bounds.x.right) x = bounds.x.right;
				 				// console.log(y);
				 /*
				 var bounds = {
					 "x":frame.width-50,
					 "y":(images[0].height*1.7)*.36
					 
				 }
				 
*/
				// console.log(bounds);
				// if (x>bounds.x)x=bounds.x;
				// if (x<-bounds.x)x=-bounds.x;
				 
//if (y<-bounds.y)y=-bounds.y;
				 
				// console.log(frame.width);
				// console.log(x,y);
					
				 var move = {
					 "x":x,
					 "y":y
				 }
				// console.log(move);
				// console.log(move);
				isvm.zoomDrag = move;	 	       
	        
	       
	//       isvm.xImage = isvm.xImage + (dragX - isvm.xLast);
//	       isvm.yImage = isvm.yImage + (dragY- isvm.yLast);
	       /*
	       console.log('image coords');
	       console.log(isvm.xImage);
	       console.log(isvm.yImage);
	       */
	       
//				 console.log(xScreen, isvm.xImage);
//	       var xNew = (dragX - isvm.xImage);
	//       var yNew = (dragY - isvm.yImage);
	//
	  //     isvm.xLast = dragX;
	    //   isvm.yLast = dragY;
	       
				// console.log(xNew, yNew);
				 
				 //console.log(images);
//				 images.css('transform', 'translate(' + dragX + 'px, ' + dragY + 'px) scale(2)');
	console.log("move:");
		


				 images.css('left', move.x+"px");
				 images.css('bottom', -move.y+"px");
				 
				 isvm.dragTracker = event.isFinal ? {"x":0,"y":0} : drag;
				 
//					isvm.isvm.scanImage(event.center.x,event.center.y);
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