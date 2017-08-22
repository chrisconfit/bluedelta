
(function() {

  angular
    .module('bdApp')
    .service('jean', ['$routeParams', '$window', 'bdAPI', '$q', 'aws', 'jsonData', 'api', jean]);

  function jean($routeParams, $window, bdAPI, $q, aws, jsonData, api) {


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
		
  	var jeanData = {};
  	
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
		
		reset = function(){
			createNew();
		}
		
		//Set up jean data from parameter
		var setup = function(data){
			var defer = $q.defer();
						
			//Set up jean from data
			if (data){ 
				for(prop in data){
					if(data.hasOwnProperty(prop)){
						set(prop, data[prop]);	
					}
				}
				defer.resolve(jeanData);
			}

			//Data URL
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
					
			//Copy or Edit Jean
			else if ($routeParams.jeanId && $routeParams.userId){

				//First get Jean
				console.log($routeParams.userId, $routeParams.jeanId);
				bdAPI.jeansGet($routeParams.userId, $routeParams.jeanId).then(					
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
			}
					
			
			//data already exists
			else if (Object.keys(jeanData).length > 0){
				defer.resolve(jeanData);
			}
			
			else{
				if(Object.keys(jeanData).length === 0 && jeanData.constructor === Object){
					createNew();			
					defer.resolve(jeanData);
				}
			}
			
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
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/fabric/g'+jeanData.gender+'/s2/f'+jeanData.fabric.fabricId+'.jpg',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/thread/g'+jeanData.gender+'/s2/tb/'+jeanData.bottom_thread.threadId+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/thread/g'+jeanData.gender+'/s2/tt/'+jeanData.top_thread.threadId+'.png',
				'http://bluedelta-data.s3-website-us-east-1.amazonaws.com/images/components/thread/g'+jeanData.gender+'/s2/ta/'+jeanData.accent_thread.threadId+'.png'
			];
	
	    for(var i=0; i<images.length; i++){
	      promises.push(loadImage(images[i], cntxt));
	    }
	    
	    return $q.all(promises).then(
	    	function(results) {
			    console.log("all images loaded");
					searchAndDraw("fabric", cntxt, results);
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
			for (var property in jeanData) {
			  if (jeanData.hasOwnProperty(property)) {
					var id = jeanData[property];
					if (typeof(id)=='object'){
						var idKey = property+"Id";
						if (idKey.indexOf("thread")>-1) idKey="threadId";
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
			
			console.log("saving jean...");
			
			var defer = $q.defer();
			var jean = this;
			var jeanData = jean.get();
			var filename = jean.getDataCode();
			filename += ".jpg";

			var blob = this.createThumb(jeanData).then(function(blob){
				jeanData.blob = blob;
				console.log(blob);
				api.call('createMyJean', jeanData, function(result){
					console.log("We have created the jean");
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
	    setup : setup,
	    reset : reset,
      set : set,
      createNew :createNew,
      getDataCode: getDataCode,
      createThumb: createThumb
     }
			
		
  }

})();