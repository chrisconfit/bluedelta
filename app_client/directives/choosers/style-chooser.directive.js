(function () {

  angular
    .module('bdApp')
    .directive('styleChooser', styleChooser);
		
  function styleChooser () {
    return {
      restrict: 'EA',
      templateUrl: '/directives/choosers/style-chooser.template.html',
      controller: 'chooserCtrl as chvm',
      scope : {
        step : '=',
        dataset: '=',
        active: '='
      },
      link: function($scope){
	      //Weight Filter
	      $scope.checkGenderFilter = function(gender){
					return function(style){
						return (style['images_'+gender] ? true:false);
				  }
				};
	    }
     

    };
  }

})();