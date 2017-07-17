
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', 'bdAPI', '$q', 'aws', jean]);

  function jean($routeParams, bdAPI, $q, aws) {

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
					"bottom_thread" : "1"
					
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
					"bottom_thread" : jean.data.bottom_thread
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
		
		
		function jeanKeytoURL(key){
			switch(key){
				case "gender":
	      return "g";
	      break;
	      
	      case "style":
	      return "s";
	      break;
	      
	      case "fabric":
	      return "f";
	      break;
	      
	      case "top_thread":
	      return "tt";
	      break;
	      
	      case "bottom_thread":
	      return "tb";
	      break;
	      
	      case "accent_thread":
	      return "ta";
	      
	      default: return false;
			}
		}
		
		
		//Set up jean data from parameter
		var setup = function(){
			
			//Data URL
			if ($routeParams.jeanId && !$routeParams.userId){
				if ($routeParams.jeanId.indexOf(":")>0){
					this.createNew();
					jeanData = $routeParams.jeanId.split(":");
					for(var d=0; d<jeanData.length; d++){
						var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
						if (!parts) continue;
						var jeanKey = parseURLkey(parts[1]);
						if (jeanKey) this.data[jeanKey] = parseInt(parts[2]);					
					}
				}
			}
			
			//Copy or Edit Jean
			else if ($routeParams.jeanId && $routeParams.userId){
				
				//First get Jean			
				bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(
					function(result){
						console.log(result);
					}, 
					function(err){
						console.log(err)
					}
				);
				
				var userData = aws.getCurrentUserFromLocalStorage();

				if(userData){
					var identityId = bdAPI.setupHeaders(userData);
					if (identityId == $routeParams.userId){
						
						//Edit Jean
						console.log($routeParams);
						
						
					}else{
						//Copy Jean
						
					}
				}
			}
				
				/*
				
			//Lookup Jean by Id
			}else if ($routeParams.jeanId){

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
			}
			
			*/
			else{
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
		
		
		function loadImage(src, cntxt) {
      return $q(function(resolve,reject) {
        var image = new Image();
        image.src = src;
        image.onload = function() {
          cntxt.drawImage(image,0,0,600,696);
          resolve(image);
        };
        image.onerror = function(e) {
          reject(e);
        };
      })
    }
    
		createThumb = function(){
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
			var images = [
				'/images/components/fabrics/g'+this.data.gender+'/s2/f'+this.data.fabric+'.jpg',
				'/images/components/threads/g'+this.data.gender+'/s2/tb/'+this.data.bottom_thread+'.png',
				'/images/components/threads/g'+this.data.gender+'/s2/tt/'+this.data.top_thread+'.png',
				'/images/components/threads/g'+this.data.gender+'/s2/ta/'+this.data.accent_thread+'.png'
			];
			
	    for(var i=0; i<images.length; i++){
	      promises.push(loadImage(images[i], cntxt));
	    }

	    return $q.all(promises).then(function(results) {
	      var dataUrl = canvas.toDataURL('image/jpeg');
				return dataUrl;
	    });	
  	}

		
		
		getDataCode = function(){
			var url = "";
			
			for (var property in this.data) {
			  if (this.data.hasOwnProperty(property)) {
					var urlKey = jeanKeytoURL(property);
					if (urlKey) url += "_"+urlKey+this.data[property];
			  }
			}	
			
			url = url.replace(/(^[_\s]+)|([_\s]+$)/g, '');
			return url;
		}
		
		
		var save = function(){
			
			var defer = $q.defer();
			
			var jean = this.data;
			console.log("jean");
			console.log(jean);
			var filename = this.getDataCode();
			filename += ".jpg";
			
			this.createThumb().then( function(imageURL){
		    var userData = aws.getCurrentUserFromLocalStorage();
		    
				bdAPI.defaultHeaders_['Authorization'] = userData.idToken.getJwtToken();
				var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
				var identityID = JSON.parse(atob(idTokenPayload)).sub;	

				console.log(userData);
				
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(
						function(result){	
				  		jean.imageURL = result;
							
							if (jean.jeanId){
								//Update existing Jean...
								bdAPI.jeansUpdate(userId, jeanId, jean).then(
									function(result){
										defer.resolve(result);
									},
									function(err){
										console.log(err);
										defer.reject(err);
									}
								);
							}else{
								//Create New Jean...
								bdAPI.jeansCreate(identityID, jean).then(
									function(result){
										defer.resolve(result);
									},
									function(err){
										console.log(err);
										defer.reject(err);
									}
								);
							}
							
				  	}, function(err){
					  	console.log(err);
					  	defer.reject(err.message);
					  }
					);
				}else{
					defer.reject("You are not logged in...");
				}
				
				
	    });
			
			return defer.promise;
			
			
			/*
			if (jean.id !== null){
				jeansUpdate(userId, jean.id, jean).then(function(result){
					console.log(result);
				});	
			}
			else{
				jeansCreate(userId, jean).then(function(result){
					console.log(result);
					
				});	
			}
			*/
		}
		
    return {
	    save : save,
	    get : get,
	    setup : setup,
      data : data,
      set : set,
      createNew :createNew,
      getDataCode: getDataCode,
      createThumb: createThumb
     }
  }

})();