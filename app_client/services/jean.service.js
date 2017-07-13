
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', 'bdAPI', jean]);

  function jean($routeParams, bdAPI) {

   	data = {};
		
		set = function(property, value){
			this.data[property] = value;
			this.saved=false;
		};
		
		createNew = function(jean){
			if (!jean || jean.constructor != Object){
				this.data = {
					"gender" : 1,
					"style" : 1,
					"fabric" : "1004",
					"accent_thread" : "1",
					"top_thread" : "1",
					"bottom_thread" : "1",
					"id":Math.floor(Math.random() * 1000000000)
					
				}
				this.saved=false;
				
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
		
		
		
		/*
		*
		* SET UP JEAN - Check route params for a data url or jean Id...
		*
		*/
		function parseURLkey(key){
			switch(key){
				case "g":
	      return "gender";
	      break;
	      
	      case "s":
	      return "style";
	      break;
	      
	      case "f":
	      return "fabric";
	      break;
	      
	      case "tt":
	      return "top_thread";
	      break;
	      
	      case "tb":
	      return "bottom_thread";
	      break;
	      
	      case "ta":
	      return "accent_thread";
	      
	      default: return false;
			}
		}
		
		
		//Set up jean data from parameter
		var setup = function(){
			
			//Copy or Create from Data
			if ($routeParams.jean_id && $routeParams.action=='copy'){

				//Create Jean from data
				if ($routeParams.jean_id.indexOf(":")>0){
					this.createNew();
					jeanData = $routeParams.jean_id.split(":");
					for(var d=0; d<jeanData.length; d++){
						var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
						if (!parts) continue;
						var jeanKey = parseURLkey(parts[1]);
						if (jeanKey) this.data[jeanKey] = parseInt(parts[2]);					
					}
					
				}
				
				//Copy Jean from ID	
				else{	
					this.createNew($routeParams.jean_id);
				}
				
				
			//Lookup Jean by Id
			}else if ($routeParams.jean_id && !$routeParams.action){

				//Edit Jean TODO: Change out with real API function to look up by ID...
				bdAPI.jsonData.getJeanById($routeParams.jean_id, function(data){
					if (data){
						this.data=data;	
					}else{
						//jean id doesn't exist
						this.createNew();
					}
				});
				
			//New Jean or Existing Data.
			}else{
				//New Jean
				if(Object.keys(this.data).length === 0 && this.data.constructor === Object) this.createNew();
				
				//If there's already data in place we'll use that.
			}
			//Return Jean data...
			return this.data;
		}
		
		
		var get=function(){
			return this.data;
		}
		
		var save = function(jean){
			console.log("saving jean...");	
		}
		
    return {
	    save : save,
	    get : get,
	    setup : setup,
      data : data,
      set : set,
      createNew :createNew
    };
    
  }

})();