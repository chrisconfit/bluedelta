
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', '$window', 'bdAPI', '$q', 'aws', 'apiData', 'api', jean]);

  function jean($routeParams, $window, bdAPI, $q, aws, apiData, api) {


		/*
		*   JSON Data lookup
		*/
		
		var dataLookup = function(dataType, key){

			var data = apiData[dataType];
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
		
  	var jeanData = {};
  	
		set = function(property, value){
			jeanData[property] = value;
			this.saved=false;
		};
		
		createNew = function(jean){
			if (!jean || jean.constructor != Object){
				jeanData = {
					"gender_option_id" : 1,
					"style_option_id" : 1,
					"fabric_id" : 1004,
					"accent_thread_id" :1,
					"top_thread_id" : 1,
					"bottom_thread_id" : 1
				}
				jeanData.saved = false;
			}else{
				jeanData = {
					"gender_option_id" : jean.gender_option_id,
					"style_option_id" : jean.style_option_id,
					"fabric_id" : jean.fabric_id,
					"accent_thread_id" : jean.accent_thread_id,
					"top_thread_id" : jean.top_thread_id,
					"bottom_thread_id" : jean.bottom_thread_id
				}
			}
		};
		
				
		function parseURLkey(key){
			switch(key){
				case "g":
	      return "gender_option_id";
	      break;
	      
	      case "s":
	      return "style_option_id";
	      break;
	      
	      case "f":
	      return "fabric_id";
	      break;
	      
	      case "tt":
	      return "top_thread_id";
	      break;
	      
	      case "tb":
	      return "bottom_thread_id";
	      break;
	      
	      case "ta":
	      return "accent_thread_id";
	      
	      default: return false;
			}
		}
		
		
		function jeanKeytoURL(key){
			switch(key){
				case "gender_option_id":
	      return "g";
	      break;
	      
	      case "style_option_id":
	      return "s";
	      break;
	      
	      case "fabric_id":
	      return "f";
	      break;
	      
	      case "top_thread_id":
	      return "tt";
	      break;
	      
	      case "bottom_thread_id":
	      return "tb";
	      break;
	      
	      case "accent_thread_id":
	      return "ta";
	      
	      default: return false;
			}
		}
		
		reset = function(){
			createNew();
		}
		
		buildJeanData = function(data, copy){

			//Make a copy
			if(copy==true){
				delete data.user_id;
				delete data.id;
				data.name = "Copy of "+data.name;
			}
			for(prop in data){
				if(data.hasOwnProperty(prop)){
					set(prop, data[prop]);	
				}
			}
		}
		
		//Set up jean data from parameter
		var setup = function(data, action){
			var defer = $q.defer();
			
			//Get our user Id and detrmine whether or not we want to make a copy		
			var userId = parseInt($window.localStorage.getItem("bdUserId"));
			var makeCopy = userId ? false : true;
			makeCopy = action == "copy" ? true : makeCopy;
			
			
			//Set up jean from object data
			if (data !== null && typeof data === 'object'){ 
				
				console.log("working from object data!");
				
				if (data.user_id && data.user_id !== userId) delete data.id;
				buildJeanData(data, makeCopy);
				defer.resolve(jeanData);
			}


			//Copy or Edit Jean from Id
			else if (data !== null && data !== undefined){
				
				console.log(data, userId, action, makeCopy);
				console.log("working from ID!");
				
				//First get Jean
				api.call('getJean', data, function(result){
					
					if (result.user_id !== userId) makeCopy = true;

					buildJeanData(result, makeCopy);
					console.log(jeanData);
					defer.resolve(jeanData);
				}, function(err){
						defer.reject(err)
				});
			}

			//Jean Data already exists
			else if (Object.keys(jeanData).length > 0){
			
				console.log("jean data already exists!");
				
				defer.resolve(jeanData);
			}
			
			else{
			
				console.log("creating new jean!");
				
				createNew();			
				defer.resolve(jeanData);
			}
			
			//Data URL
			/*
			else if ($routeParams.jeanId && !$routeParams.userId){
				createNew();
				if ($routeParams.jeanId.indexOf(":")>0){
					jeanData = $routeParams.jeanId.split(":");
					for(var d=0; d<jeanData.length; d++){
						var parts= jeanData[d].match(/([A-Za-z]+)([0-9]+)/);
						if (!parts) continue;
						var jeanKey = parseURLkey(parts[1]);
						if (jeanKey) jeanData[jeanKey] = parseInt(parts[2]);					
					}
				}
				defer.resolve(jeanData);
			}
			*/
			
			
					
							
				/*bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(					
					function(result){

						var newJean = result.data;

						var userData = aws.getCurrentUserFromLocalStorage();
						
						if(userData){
							
							var identityId = bdAPI.setupHeaders(userData);							
							//Edit Jean
							if (identityId == $routeParams.userId){
								for(prop in newJean){
									if(newJean.hasOwnProperty(prop)){
										set(prop, newJean[prop]);	
									}
								}
							}							
							//Copy Jean
							else{
								createNew(newJean);
							}

						}
						
						//Not logged in.. create new.
						else {
							createNew(newJean);
						}
						
						defer.resolve(jeanData);
					}, 
					function(err){
						//Jean or user not found.. just create a blank jean...
						console.log(err);
						createNew();
						defer.resolve(jeanData);
					}
				);
				*/
		
					
			

			
			return defer.promise;
		}
		
		
		var get=function(){
			return jeanData;
		}
		
		
		function loadImage(src) {
			return $q(function(resolve,reject) {
			  var image = new Image();
			  image.crossOrigin = "";
			  image.src = src;
			  image.onload = function() {
			    resolve(image);
			  };
			  image.onerror = function(e) {
			    reject(e);
			  };
			})
		}   
    
	 function searchAndDraw(key, cntxt, images){
			for(i=0; i<images.length; i++){
				var image = images[i];
				if(image.src.indexOf("/"+key+"/") > -1){
					cntxt.drawImage(image,0,0,600,696);
				};
			}
		}
		
	  var createThumb = function(jeanData){
	  	var canvas = document.createElement('canvas');
	  	canvas.width=600;
	  	canvas.height=600;
	  	var cntxt = canvas.getContext('2d');	
	  	var promises = [];
			var images = [
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/fabrics/g'+jeanData.gender_option_id+'/s2/f'+jeanData.fabric_id+'.jpg',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/tb/'+jeanData.bottom_thread_id+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/tt/'+jeanData.top_thread_id+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/threads/g'+jeanData.gender_option_id+'/s2/ta/'+jeanData.accent_thread_id+'.png'
			];
	
	    for(var i=0; i<images.length; i++){
	      promises.push(loadImage(images[i], cntxt));
	    }
	    
	    return $q.all(promises).then(
	    	function(results) {
					searchAndDraw("fabrics", cntxt, results);
					searchAndDraw("tb", cntxt, results);
					searchAndDraw("tt", cntxt, results);
					searchAndDraw("ta", cntxt, results);
		      var dataUrl = canvas.toDataURL('image/jpeg');
					return dataUrl;
		    },    
		    function(err){
			    console.log(err);
		    }
	    );	
		}
		
		
		getDataCode = function(){
			var url = "";
			console.log("get data code!!!");
			console.log(jeanData);
			
			for (var property in jeanData) {
			  if (jeanData.hasOwnProperty(property)) {
					var id = jeanData[property];
					var urlKey = jeanKeytoURL(property);
					console.log(property, urlKey, id);
					if (urlKey) url += "_"+urlKey+id;
			  }
			}	
			url = url.replace(/(^[_\s]+)|([_\s]+$)/g, '');
			console.log(url);
			return url;
		}
		
		var deleter = function (jeanId, callback){
			api.call('deleteMyJean', jeanId, function(result){
				if (callback) callback(result);
			});
		};
		
		var save = function(){
			
			console.log("saving jean...");
			
			var defer = $q.defer();
			var jean = this;
			var jeanData = jean.get();
			var filename = jean.getDataCode();
			filename += ".jpg";
			jeanData.image = {filename:filename};
			this.createThumb(jeanData).then(function(blob){
				jeanData.image.data = blob;
				api.call('createMyJeans', jeanData, function(result){
					console.log("We have created the jean");
					console.log(result);
					defer.resolve(result);
				}, function(err){
					defer.reject(err);
				});//api.call();
				
			}, function(err){
				defer.reject(err);
			}); //createThumb();
			
			return defer.promise;
			/*

			
			
				
		    var userData = aws.getCurrentUserFromLocalStorage();
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(
						function(result){	

							//Add image to jean before saving...
				  		jean.set("imageURL",result);
							var	userId = aws.getCurrentIdentityId();
							var args = jeanData.jeanId ? [userId, jeanData.jeanId, jeanData] : [userId, jeanData];
							var saveFunc = jeanData.jeanId ? 'jeansUpdate' : 'jeansCreate';
							
							bdAPI.call(saveFunc, args, function(result){
								
								//For new jeans... set the Id..
								var newJean = result.data.jeans[result.data.jeans.length-1];
								if (!jeanData.jeanId) jean.set("jeanId", newJean.jeanId);
								defer.resolve(result);
							}, function(err){defer.reject(err);});

							
				  	}, function(err){
					  	console.log(err);
					  	defer.reject(err.message);
					  }
					);
				}else{
					defer.reject("You are not logged in...");
				}
				
	    });
			*/

		}
		
			
		return {
	    dataLookup: dataLookup,
	    deleter : deleter,
	    save : save,
	    get : get,
	    set: set,
	    setup : setup,
	    reset : reset,
      set : set,
      createNew :createNew,
      getDataCode: getDataCode,
      createThumb: createThumb
     }
			
		
  }

})();