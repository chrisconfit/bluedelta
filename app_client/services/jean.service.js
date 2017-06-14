
(function() {

  angular
    .module('bdApp')
    .service('jean', jean);

  function jean() {
		
   	data = {};
		
		set = function(property, value){
			this.data[property] = value;
		};
		
		createNew = function(jean){
			if (!jean){
				this.data = {
					"gender" : 1,
					"style" : 1,
					"fabric" : "1004",
					"accent_thread" : "1",
					"top_thread" : "1",
					"bottom_thread" : "1",
					"id":Math.floor(Math.random() * 1000000000)
				}
			}else{
				this.data = {
					"title" : "Copy of "+jean.data.title,
					"gender" : jean.data.gender,
					"style" : jean.data.style,
					"fabric" : jean.data.fabric,
					"accent_thread" : jean.data.accent_thread,
					"top_thread" : jean.data.top_thread,
					"bottom_thread" : jean.data.bottom_thread,
					"id":Math.floor(Math.random() * 1000000000)
				}
			}
		};

    return {
      data : data,
      set : set,
      createNew :createNew
    };
    
  }

})();