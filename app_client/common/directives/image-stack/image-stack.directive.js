(function () {

  angular
    .module('meanApp')
    .directive('imageStack', imageStack);
		
	imageStack.$inject = ['$swipe'];
	
  function imageStack ($swipe) {
    return {
      restrict: 'AE',
      templateUrl: '/common/directives/image-stack/image-stack.template.html',
      controller: 'istackCtrl as isvm',
      link: function(scope, ele, attrs, ctrl) {
	      $swipe.bind(ele, {
          'move': function(coords) {
						scope.isvm.scanImage(coords.x,coords.y);
          }
	      });
	      
	    }
    };
    
  }
  
    
  
  

})();