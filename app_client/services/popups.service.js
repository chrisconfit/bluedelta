
(function() {

  angular
    .module('bdApp')
    .service('popups', popups);

  function popups() {
		
    return {
      denim : false,
      hiw : false,
      infoPop:false,
      jeanProfile:false
    };
    
  }

})();