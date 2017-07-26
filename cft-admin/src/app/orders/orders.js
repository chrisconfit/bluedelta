'use strict';

angular.module('inspinia')
  .controller('OrdersController', ['bdAPI', '$scope', 'aws', 'DTColumnDefBuilder', 'jsonData', function (bdAPI, $scope, aws, DTColumnDefBuilder, jsonData) {


		console.log(bdAPI);

		console.log("let's get some more orders...");
    var vm = this;
    
		vm.user = {
			"name":"Chris LeFevre"
		}    
    
    //init vendors from route resolve...
    vm.data = jsonData.data;
    
    
		vm.timeFromNow = function(timestamp){
			return moment(timestamp).fromNow();
		}
		
		vm.timelineForm = {
			message:null
		}
		
    vm.addTimelineItem = function(){

	    if (!vm.timelineForm.message) return false;
	    
	    var d = new Date();
	    vm.order.timeline.push(
		    {
			    "message":vm.timelineForm.message,
			    "timestamp":d.toISOString(),
			    "user":vm.user.name
		    }
	    )
	    vm.saveOrder();
	    vm.timelineForm.message = null;
    }
    
    vm.saveOrder = function(){
	    console.log("we need to save");
    }
    
    vm.exampleOrder = {
	    "orderId": 134225,
	    "userId":134253,
	    "orderItems":[
	    	{
		    	"jean":{
							"gender":1,
							"style":1,
							"fabric":{  
							  "name":" 10oz. Raw Denim Light Indigo",
							  "weight":10,
							  "description":"Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam fabricId dolor fabricId nibh ultricies vehicula ut fabricId elit. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.",
							  "materials":"99% Cotton / 1% Spandex",
							  "fabricId":1103,
							  "supplier":"USA Milled by Cone"
							},
							"accent_thread":{  
							  "threadId":1,
							  "name":"Gold",
							  "thumb":"/images/controls/thread-gold.jpg",
							  "layer":"/images/components/thread-gold.png"
							},
							"top_thread":{  
							  "threadId":1,
							  "name":"Gold",
							  "thumb":"/images/controls/thread-gold.jpg",
							  "layer":"/images/components/thread-gold.png"
							},
							"bottom_thread":{  
							  "threadId":1,
							  "name":"Gold",
							  "thumb":"/images/controls/thread-gold.jpg",
							  "layer":"/images/components/thread-gold.png"
							},
							"saved":false,
							"imageURL":"https://blue-delta-api-development-stack-userdatabucket-12z57hiicf3xy.s3.amazonaws.com/us-east-1%3A8f646bc0-78c6-4f87-b6a7-47d4f2893174/g1_f1103_s1_tbundefined_taundefined_ttundefined.jpg",
							"id":"65",
							"jeanId":65
					},
					"status":"New",
		    	"tracking" :null,
		    	"notes" :"I would like a monogram"

		    }	
			],
	    "transaction":{},
	    "timeline":[
		    {
			    "timestamp":"2017-07-24T18:38:42+00:00",
			    "message": "Order Placed"
		    },
		    {
			    "timestamp" :"2017-07-26T18:41:36+00:00",
			    "message" : "Phone Call with customer"
		    }
	    ]
    };
    
    
    //NEED TO ADD IN
    vm.exampleOrder.price = null;
    vm.exampleOrder.vendor = null;
		vm.exampleOrder.rep = null;
		vm.exampleOrder.orderType = 1;
		vm.exampleOrder.status = "New";
		vm.exampleOrder.fitDate = null;
		vm.exampleOrder.dueDate = null;
		vm.exampleOrder.dob = null;
    
    vm.order=vm.exampleOrder;
    vm.orders = {};
    
    aws.authenticateCognitoUser("chris@confitdesign.com","Go@tboy4535").then(
			function(result){
				console.log(result);
				
				var id = bdAPI.setupHeaders();
				bdAPI.ordersList().then(
				function(result){
					console.log(result);
					vm.orders = result.data.items;
					$scope.$apply();
				}, 
				function(err){console.log(err)} 
			);
					
				
				
			},
			
			
			function(err){
				if (err.message == "Incorrect username or password.") err.message = "Incorrect Email address or password."
				messages.set(err.message,"error");
			}
			
		);
    
    
   $scope.dtColumnDefs = [
   	DTColumnDefBuilder.newColumnDef(3).notSortable(),
	 	DTColumnDefBuilder.newColumnDef(2).notSortable()
	 ];
    		
        


		

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

  }]);
