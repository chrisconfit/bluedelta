
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', '$http','bdAPI', '$q', 'aws', 'jsonData', jean]);

  function jean($routeParams, $http, bdAPI, $q, aws, jsonData) {


		/*
		*   JSON Data lookup
		*/
		
		var dataLookup = function(dataType, key){

			var data = jsonData[dataType];
			if (!data) return false;
			
			for (i=0; i<data.length; i++) {
				//	console.log(data[i][dataType+"Id"], key);
				if (data[i][dataType+"Id"] == key) 				
				return data[i];
  		}
		}
		

		
		/*
		*.  Jean Data
		*/
		
  	jeanData = {};
  	
		set = function(property, value){
			jeanData[property] = value;
			this.saved=false;
		};
		
		createNew = function(jean){
			if (!jean || jean.constructor != Object){
				jeanData = {
					"gender" : 1,
					"style" : 1,
					"fabric" : dataLookup("fabric", 1004),
					"accent_thread" : dataLookup("thread", 1),
					"top_thread" : dataLookup("thread", 1),
					"bottom_thread" : dataLookup("thread", 1)
				}
				jeanData.saved = false;
			}else{
				jeanData = {
					"gender" : jean.gender,
					"style" : jean.style,
					"fabric" : jean.fabric.fabricId,
					"accent_thread" : jean.accent_thread.threadId,
					"top_thread" : jean.top_thread.threadId,
					"bottom_thread" : jean.bottom_thread.threadId
				}
			}
		};
		
				
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
			
			var jean = this;
						
			//Set up jean from data
			if (data){ jeanData = data; }

			//Data URL
			else if ($routeParams.jeanId && !$routeParams.userId){
				if ($routeParams.jeanId.indexOf(":")>0){
					createNew();
					jeanData = $routeParams.jeanId.split(":");
					for(var d=0; d<jeanData.length; d++){
						var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
						if (!parts) continue;
						var jeanKey = parseURLkey(parts[1]);
						if (jeanKey) jeanData[jeanKey] = parseInt(parts[2]);					
					}
				}
			}
					
			//Copy or Edit Jean
			else if ($routeParams.jeanId && $routeParams.userId){
				
				console.log($routeParams.jeanId,$routeParams.userId);
				
				//First get Jean
				bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(					
					function(result){
						console.log("result");
						console.log(result.data);
						var newJean = result.data;
						var userData = aws.getCurrentUserFromLocalStorage();
						if(userData){
							var identityId = bdAPI.setupHeaders(userData);
							if (identityId == $routeParams.userId){ //Edit Jean		
								console.log(newJean)
								console.log(jean.jeanData);
								jean.jeanData=newJean;
								console.log(jean.jeanData);
							}
							
							else{ //Copy Jean
								createNew(newJean);
							}
						}else{
							//Not logged in... copy jean
							createNew(newJean);
						}
					}, 
					function(err){
						//Jean or user not found.. just create a blank jean...
						console.log(err);
						createNew();
					}
				);
			}
					
			//New Jean
			else{
				if(Object.keys(jeanData).length === 0 && jeanData.constructor === Object) createNew();			
				//If there's already data in place we'll use that.
			}
					
		}
		
		
		var get=function(){
			return jeanData;
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
    
		createThumb = function(jeanData){
			console.log(jeanData);
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
			var images = [
				'/images/components/fabric/g'+jeanData.gender+'/s2/f'+jeanData.fabric.fabricId+'.jpg',
				'/images/components/thread/g'+jeanData.gender+'/s2/tb/'+jeanData.bottom_thread.threadId+'.png',
				'/images/components/thread/g'+jeanData.gender+'/s2/tt/'+jeanData.top_thread.threadId+'.png',
				'/images/components/thread/g'+jeanData.gender+'/s2/ta/'+jeanData.accent_thread.threadId+'.png'
			];
			console.log(images);
	    for(var i=0; i<images.length; i++){
	      promises.push(loadImage(images[i], cntxt));
	    }

	    return $q.all(promises).then(function(results) {
	      var dataUrl = canvas.toDataURL('image/jpeg');
				return dataUrl;
	    },
	    function(err){
		    console.log(err);
	    });	
  	}

		
		
		getDataCode = function(){
			var url = "";
			for (var property in jeanData) {
			  if (jeanData.hasOwnProperty(property)) {
					var id = jeanData[property];
					if (typeof(id)=='object'){
						var idKey = property+"Id";
						if (idKey.indexOf("Thread")>-1) idKey="threadId";
						id = id[idKey];
					}
					var urlKey = jeanKeytoURL(property);
					if (urlKey) url += "_"+urlKey+id;
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
			
			
			console.log('save');
			
			var defer = $q.defer();
			var jean = this;
			console.log(this);
			var jeanData = jean.get();
	

			console.log(jeanData);
			
			var filename = jean.getDataCode();
			filename += ".jpg";
			this.createThumb(jeanData).then( function(imageURL){
		    var userData = aws.getCurrentUserFromLocalStorage();
				bdAPI.defaultHeaders_['Authorization'] = userData.idToken.getJwtToken();
				var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
				var identityID = JSON.parse(atob(idTokenPayload)).sub;	
				
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(
						function(result){	
							//Add image to jean before saving...
				  		jean.set("imageURL",result);
							if (jeanData.jeanId){
								//Update existing Jean...
								console.log('update');
								bdAPI.jeansUpdate(identityID, jeanData.jeanId, jeanData).then(
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
								console.log('create');
								console.log(jeanData);
								bdAPI.jeansCreate(identityID, jeanData).then(

									function(result){
										//Add new id to jean
										console.log(result);
										jean.set("jeanId", result.data.jeanId);
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
		
		//Wait for data to be assigned before returning...
		
			
		return {
	    dataLookup: dataLookup,
	    deleter : deleter,
	    save : save,
	    get : get,
	    setup : setup,
      set : set,
      createNew :createNew,
      getDataCode: getDataCode,
      createThumb: createThumb
     }
			
		
  }

})();