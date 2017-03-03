(function () {

  angular
    .module('meanApp')
    .directive('chooser', chooser);
		
  function chooser () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/choosers/chooser.template.html',
      controller: 'chooserCtrl as chvm',
      scope : {
        step : '=',
        dataset: '='
      }
    };
  }

})();