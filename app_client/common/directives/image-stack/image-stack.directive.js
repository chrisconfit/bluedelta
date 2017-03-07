(function () {

  angular
    .module('meanApp')
    .directive('imageStack', imageStack);
		

	
  function imageStack () {
    return {
      restrict: 'AE',
      templateUrl: '/common/directives/image-stack/image-stack.template.html',
      controller: 'istackCtrl as isvm',
      link: function(scope, ele, attrs, ctrl) {
				scope.myDrag = function(s, event) {
				//	console.log(event);
					scope.isvm.scanImage(event.center.x,event.center.y);
				}
	      
	      /*
	      $swipe.bind(ele, {
          'move': function(event) {
						scope.isvm.scanImage(coords.x,coords.y);
          }
	      });
	     */

	    }
    };
    
  }
  
    
  
  

})();