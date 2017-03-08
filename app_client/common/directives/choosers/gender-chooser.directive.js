(function () {

  angular
    .module('meanApp')
    .directive('genderChooser', genderChooser);
		
  function genderChooser () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/choosers/gender-chooser.template.html',
      controller: 'chooserCtrl as chvm',
      scope : {
        step : '=',
        dataset: '=',
        active: '='
      }
    };
  }

})();