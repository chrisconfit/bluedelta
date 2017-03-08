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
	      
	      console.log('here we go')
	      
	     				
			
       
	      
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