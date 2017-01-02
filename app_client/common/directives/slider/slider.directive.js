(function () {

  angular
    .module('meanApp')
    .directive('slider', slider);
		
  function slider () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/slider/slider.template.html',
      controller: 'sliderCtrl as slvm',
      scope : {
        slides : '=',
        imageClick : '&'
      }
    };
  }

})();