'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['$filter', '$q', 'bdAPI', '$scope', 'aws', 'orderData', 'toaster', '$uibModal','api', 'appData',
  function ($filter, $q, bdAPI, $scope, aws, orderData, toaster, $uibModal, api, appData) {

    var vm = this;
    

    
		var newOrderData = {
			fitDate:"",
			dob:"",
			dueDate:"",
			order_items:[
				{
					jean:{
						measurement:{}
					}
				}
			]
		}
		console.log("orderData");
		console.log(orderData);
		
		vm.newOrder = orderData ? false : true;
		vm.order = vm.newOrder ? newOrderData : orderData;
		vm.originalJean = vm.newOrder ? null : angular.copy(vm.order.order_items[0]);
		vm.order.fitDate =  vm.order.fitDate ? vm.order.fitDate: null;
		vm.order.dob =  vm.order.dob ? vm.order.dob: null;
		vm.order.dueDate =  vm.order.dueDate ? vm.order.dueDate: null;
		vm.orderUser = orderData.user || {};
    
    vm.convertToCurrency = function(){
	    price = vm.order.price.replace("$","");
	    var price = $filter('currency')(price, "");
	    if(!price) price = "Please enter a valid price";
			vm.order.price = price
  	};
    
    
    vm.lookup = function(key, value, data){
			return false;
    }
    
    
    
    vm.style=[
	    {"styleId":1, "label":"Straight"},
	    {"styleId":2, "label":"Skinny"},
	    {"styleId":3, "label":"Bootcut"},
    ]
    
    vm.genders = [
	    {"genderId":1, "label":"Male"},
			{"genderId":2, "label":"Female"},
    ];
    
    vm.status = [
			{"statusId":1, "label":"New"},
			{"statusId":2, "label":"Awaiting Payment"},
			{"statusId":3, "label":"Processing"},
			{"statusId":4, "label":"Shipped"},
			{"statusId":5, "label":"Completed"},
    ];

		vm.orderType = [
			{"typeId":1, "label":"Blue Delta"},
			{"typeId":2, "label":"Vendor Fitted"},
			{"typeId":3, "label":"Cloned from Non-BD Jean"},
			{"typeId":4, "label":"Cloned from BD Jean"},
			{"typeId":5, "label":"Re-Order"},
		];
			
		
    //init json data from route resolve...

		vm.data = appData;
		console.log("here it is");
		console.log(appData);
		
		vm.timeFromNow = function(timestamp){
			return moment(timestamp).fromNow();
		}
		
		
		vm.timelineForm = {
			message:null
		}
		
		//Edit Jean details...
		vm.EditMode= vm.newOrder ? true : false;
		vm.beginJeanEdit = function(){
			vm.EditMode = true;
			vm.BeforeEdit = angular.copy(vm.order.order_items[0]);
		}
		vm.clearJeanEdit = function(){
			vm.EditMode = false;
			vm.order.order_items[0] = angular.copy(vm.BeforeEdit);
		}
		

		vm.billingSameAsShipping = function(){
			if (!vm.order.billingAddress || Object.keys(vm.order.billingAddress)<1) vm.order.billingAddress = vm.order.shippingAddress;
			
			return angular.equals(vm.order.billingAddress, vm.order.shippingAddress);
		}

    vm.editAddress = function (type, icon) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/address-choice/address.html',
        controller: 'AddressController',
        resolve: {
	        data: {
		        addressType : type,
		        icon : icon,
		      },
	        saveOrder : function(){
		        return vm.saveOrder;
	        },
          address: function () {
            return vm.orderUser.addresses;
          },
          order : function() {
	          return vm.order;
          }
        }
    	});
    };
    
       
    vm.editUser = function(){
	    var modalInstance = $uibModal.open({
        templateUrl: 'app/orders/userChoice.html',
        controller: 'UserChoiceController',
        resolve: {
	        saveOrder : function(){
		        return vm.saveOrder;
	        },
          orderUser : function() {
	          return vm.orderUser;
          },
          order : function() {
	          return vm.order;
          }
        }
    	});
    };

	    
		
		
    vm.addTimelineItem = function(){
	    if (!vm.timelineForm.message) return false;
			bdAPI.call('commentsCreate', [vm.order.orderId, {message:vm.timelineForm.message}], 
				function(result){
					console.log("comment created");
					vm.order=result.data;
					vm.timelineForm.message = null;
					$scope.$apply();
				}
			);
    }
    

    
    
    
    
    
    
    
  
	/*														*\
	*															*
	*															*
	* * * * *  Thumnnail 	* * * * * 
	*															*	
	\*	  												*/	  
    
	function loadImage(src) {
		return $q(function(resolve,reject) {
		  var image = new Image();
		  image.crossOrigin = "";
		  image.src = src;
		  image.onload = function() {
			  console.log("image loaded!!");
		    resolve(image);
		  };
		  image.onerror = function(e) {
		    reject(e);
		  };
		})
	}   
    
 function searchAndDraw(key, cntxt, images){
		for(var i=0; i<images.length; i++){
			var image = images[i];
			if(image.src.indexOf("/"+key+"/") > -1){
				cntxt.drawImage(image,0,0,600,696);
			};
		}
	}
  function createThumb(jeanData){
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
	
	function getDataCode(jeanData){
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
	
	function jeanHasChanged(){
		var o1 = vm.order.order_items[0];
		var o2 = vm.originalJean;
		return !angular.equals(o1, o2);
	}
	
	function compareObjects(s, t) {
    if (typeof s !== typeof t) {
        console.log("two objects not the same type");
        return false;
    }
    if (typeof s !== "object") {
        console.log('arguments are not typeof === "object"');
        return;
    }
    for (var prop in s) {
        if (s.hasOwnProperty(prop)) {
            if (t.hasOwnProperty(prop)) {
                if (!angular.equals(s[prop], t[prop])) {
                    console.log("property " + prop + " does not match");
                }
            } else {
                console.log("second object does not have property " + prop);
            }
        }
    }
    // now verify that t doesn't have any properties 
    // that are missing from s
    for (prop in t) {
        if (t.hasOwnProperty(prop)) {
            if (!s.hasOwnProperty(prop)) {
                console.log("first object does not have property " + prop);
            }
        }
    }
    
    console.log("objects are the same");
}





	/*														*\
	*															*
	*															*
	* * * * * Save/Create	* * * * * 
	*															*	
	\*	  												*/	




	function runSaveFunc(){
		var args = vm.newOrder ? vm.order : [vm.order.orderId, vm.order];
		var saveFunc = vm.newOrder ? 'orderCreate' : 'ordersUpdate';
		var succMessage = vm.newOrder ? "Order Created" : "Order Saved";
		var errMessage = vm.newOrder ? "Could not create" : "Could not Save";	
		bdAPI.call(saveFunc, args, function(result){
			console.log(result);
			
			toaster.pop({
			  type: 'success',
			  title: succMessage,
			  showCloseButton: true,
			  timeout: 3000
			});
			
			if (vm.newOrder){
				console.log(result.orderId);
			}
			
			
		}, function(){
			toaster.pop({
			  type: 'error',
			  title: errMessage,
			  body: "err.message",
			  showCloseButton: true,
			  timeout: 7000
			});
		});
	}


	vm.saveOrder = function(){
		
		toaster.pop({
		  type: 'wait',
		  title: "Saving...",
		  showCloseButton: true,
		  timeout: 3000
		});
		
		if(jeanHasChanged()){
			var jean = vm.order.order_items[0];
			var filename = getDataCode(jean);
			filename += ".jpg";
			createThumb(jean).then( function(imageURL){
				var userData = aws.getCurrentUserFromLocalStorage();
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(function(result){
						vm.order.order_items[0].imageURL = result;
						runSaveFunc();
					});
				}
			});	
		}else{
			runSaveFunc();
		}
		
		
//			var defer = $q.defer();
/*
	
	var jean = vm.order.order_items[0];
	var filename = getDataCode(jean);
	filename += ".jpg";

		createThumb(jean).then( function(imageURL){
			var userData = aws.getCurrentUserFromLocalStorage();
//			var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
	//		var identityID = JSON.parse(atob(idTokenPayload)).sub;

			if (userData){		
				aws.saveImageTos3(imageURL, userData, filename).then(function(result){
					console.log(result);
				});
			}
			
		});
			/*
		    var userData = aws.getCurrentUserFromLocalStorage();
				bdAPI.defaultHeaders_['Authorization'] = userData.idToken.getJwtToken();
				var idTokenPayload = userData.idToken.jwtToken.split('.')[1];
				var identityID = JSON.parse(atob(idTokenPayload)).sub;	
				
				if (userData){		
					aws.saveImageTos3(imageURL, userData, filename).then(
						function(result){	
							//Add image to jean before saving...
				  		jean.set("imageURL",result);
							if (jeanDataId){
								//Update existing Jean...

								bdAPIsUpdate(identityID, jeanDataId, jeanData).then(
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
								bdAPIsCreate(identityID, jeanData).then(

									function(result){
										//Add new id to jean
										jean.set("jeanId", result.dataId);
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
			
*/
		}

		
    

  }]);
