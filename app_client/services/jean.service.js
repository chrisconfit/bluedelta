
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', '$http','bdAPI', '$q', 'aws', jean]);

  function jean($routeParams, $http, bdAPI, $q, aws) {
		
		
		
		
		var jvm = this;
		
		
		/*
		*  Set up JSON Data
		*/
		jvm.jsonData = {};
		
		setupJsonData = function(key){
			jvm.promises.push(
				$http.get('/data/'+key+'.json')
			);
		}
		
		setupJson = function(){
			var defer = $q.defer();
			console.log(Object.keys(jvm.jsonData) );
			if (Object.keys(jvm.jsonData).length > 0){ defer.resolve(jvm.jsonData); }
			else{
				console.log("SETTINGUPPP");
			}
			
			jvm.promises = [];		
			var jsonDataKeys = ['style', 'thread', 'button', 'fabric', 'gender'];
			
			for (d = 0; d < jsonDataKeys.length; d++){
				setupJsonData(jsonDataKeys[d]);
			}
			
			$q.all(jvm.promises).then(
				function(result){
					for(r=0;r<result.length;r++){
						var key = result[r].config.url.replace("/data/","").replace(".json","");
						jvm.jsonData[key] = result[r].data;
					}
					defer.resolve(jvm.jsonData);					
				},
				function(err){defer.reject(err);}
			);
			return defer.promise;	
		}
		

		var getJsonData = function(){
			return jvm.jsonData;
		}




		/*
		*   JSON Data lookup
		*/
		
		var dataLookup = function(dataType, key){
console.log(dataType,key);
console.log(dataType,key);
console.log(dataType,key);

			var data = jvm.jsonData[dataType];
			if (!data) return false;
			
									console.log("NEW");
			for (i=0; i<data.length; i++) {

			//	console.log(data[i][dataType+"Id"], key);
				if (data[i][dataType+"Id"] == key) 
				

					return data[i];
  		}
		}
		

		
		/*
		*.  Jean Data
		*/
		
  	jvm.jeanData = {};
  	
		set = function(property, value){
			jvm.jeanData[property] = value;
			this.saved=false;
		};
		
		createNew = function(jean){
			if (!jean || jean.constructor != Object){
				jvm.jeanData = {
					"gender" : 1,
					"style" : 1,
					"fabric" : dataLookup("fabric", 1004),
					"accentThread" : dataLookup("thread", 1),
					"topThread" : dataLookup("thread", 1),
					"bottomThread" : dataLookup("thread", 1)
				}
				jvm.jeanData.saved = false;
			}else{
				jvm.jeanData = {
					"gender" : jean.gender,
					"style" : jean.style,
					"fabric" : jean.fabric.fabricId,
					"accentThread" : jean.accentThread.threadId,
					"topThread" : jean.topThread.threadId,
					"bottomThread" : jean.bottomThread.threadId
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
			var defer = $q.defer();
			
			//Set up jean from data
			if (data){
				jvm.jeanData = data;
				defer.resolve(jvm.jeanData);
			}
			else{
				setupJson().then(function(){
					console.log('setup');
					//Data URL
					if ($routeParams.jeanId && !$routeParams.userId){
						if ($routeParams.jeanId.indexOf(":")>0){
							createNew();
							jeanData = $routeParams.jeanId.split(":");
							for(var d=0; d<jeanData.length; d++){
								var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
								if (!parts) continue;
								var jeanKey = parseURLkey(parts[1]);
								if (jeanKey) jvm.jeanData[jeanKey] = parseInt(parts[2]);					
							}
						}
						defer.resolve(jvm.jeanData);
					}
					
					//Copy or Edit Jean
					else if ($routeParams.jeanId && $routeParams.userId){
						//First get Jean
						bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(					
							function(result){
								var newJean = result.jeanData;
								var userData = aws.getCurrentUserFromLocalStorage();
								if(userData){
									var identityId = bdAPI.setupHeaders(userData);
									if (identityId == $routeParams.userId){ //Edit Jean		
										jvm.jeanData=newJean;
									}
									else{ //Copy Jean
										createNew(newJean);
									}
								}else{
									//Not logged in... copy jean
									createNew(newJean);
								}
								console.log(jean);
								defer.resolve(jean.jeanData);
							}, 
							function(err){
								//Jean or user not found.. just create a blank jean...
								console.log(err);
								createNew();
								defer.resolve(jean.jeanData);
							}
						);
					}
					
					//New Jean
					else{
						if(Object.keys(jvm.jeanData).length === 0 && jvm.jeanData.constructor === Object) createNew();		
						console.log(jvm.jeanData);
						defer.resolve(jvm.jeanData);		
						//If there's already data in place we'll use that.
					}
					
				});
			}
			
						
			//Return Jean data...
			return defer.promise;
		}
		
		
		var get=function(){
			return jvm.jeanData;
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
				'/images/components/fabrics/g'+jvm.jeanData.gender+'/s2/f'+jvm.jeanData.fabric+'.jpg',
				'/images/components/threads/g'+jvm.jeanData.gender+'/s2/tb/'+jvm.jeanData.bottom_thread+'.png',
				'/images/components/threads/g'+jvm.jeanData.gender+'/s2/tt/'+jvm.jeanData.top_thread+'.png',
				'/images/components/threads/g'+jvm.jeanData.gender+'/s2/ta/'+jvm.jeanData.accent_thread+'.png'
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
			for (var property in jvm.jeanData) {
			  if (jvm.jeanData.hasOwnProperty(property)) {
					var urlKey = jeanKeytoURL(property);
					if (urlKey) url += "_"+urlKey+jvm.jeanData[property];
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
			var jean = this;
			
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
							//Add image to jean before saving...
				  		jean.set("imageURL",result);
							if (jean.jeanData.jeanId){
								//Update existing Jean...
								bdAPI.jeansUpdate(identityID, jean.jeanData.jeanId, jean.jeanData).then(
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
								bdAPI.jeansCreate(identityID, jean.jeanData).then(
									function(result){
										//Add new id to jean
										jean.set("jeanId",result.jeanData.jeanId);
										defer.resolve(result);
									},
									function(err){
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
			setupJson:setupJson,
			getJsonData :getJsonData,
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