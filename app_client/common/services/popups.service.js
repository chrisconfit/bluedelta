
(function() {

  angular
    .module('meanApp')
    .service('popups', popups);

  function popups() {
		
    return {
      denim : false,
      hiw : false
    };
    
  }

})();