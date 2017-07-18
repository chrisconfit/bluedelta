
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
					"gender" : jean.gender,
					"style" : jean.style,
					"fabric" : jean.fabric,
					"accent_thread" : jean.accent_thread,
					"top_thread" : jean.top_thread,
					"bottom_thread" : jean.bottom_thread
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
		var setup = function(data){
			var defer = $q.defer();
			console.log($routeParams);
			
			//Set up jean from data
			if (data){
				this.data = data;
				defer.resolve(this.data);
			}
			
			//Data URL
			else if ($routeParams.jeanId && !$routeParams.userId){
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
				defer.resolve(this.data);
			}
			
			//Copy or Edit Jean
			else if ($routeParams.jeanId && $routeParams.userId){
				var jean = this;
				
				//First get Jean
				bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(					
					function(result){
						var newJean = result.data;
						var userData = aws.getCurrentUserFromLocalStorage();
						if(userData){
							var identityId = bdAPI.setupHeaders(userData);
							if (identityId == $routeParams.userId){ //Edit Jean		
								jean.data=newJean;
							}
							else{ //Copy Jean
								jean.createNew(newJean);
							}
						}else{
							//Not logged in... copy jean
							jean.createNew(newJean);
						}
						console.log(jean);
						defer.resolve(jean.data);
					}, 
					function(err){
						//Jean or user not found.. just create a blank jean...
						console.log(err);
						jean.createNew();
						defer.resolve(jean.data);
					}
				);
			}
			
			//New Jean
			else{
				if(Object.keys(this.data).length === 0 && this.data.constructor === Object) this.createNew();		
				defer.resolve(this.data);		
				//If there's already data in place we'll use that.
			}
			
			
			//Return Jean data...
			return defer.promise;
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
		
		var deleter = function (userId, jeanId, callback){
			console.log(userId,jeanId,callback);
			var userData = aws.getCurrentUserFromLocalStorage();
			bdAPI.defaultHeaders_['Authorization'] = userData.idToken.getJwtToken();
			bdAPI.jeansDelete(userId, jeanId).then(
				function(result){
					if (callback) callback(result);
				},
				function(err){
					console.log(err);
				}
			)
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
								bdAPI.jeansUpdate(identityID, jean.jeanId, jean).then(
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
	    deleter : deleter,
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