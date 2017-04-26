
(function() {

  angular
    .module('bdApp')
    .service('jean', jean);

  function jean() {

   	data = {};
		
		set = function(property, value){
			this.data[property] = value;
		}
		
    return {
      data : data,
      set : set
    };
    
  }

})();