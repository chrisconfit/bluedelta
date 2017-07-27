'use strict';

angular.module('inspinia')
  .controller('OrdersEditController', ['bdAPI', '$scope', 'aws', 'DTColumnDefBuilder', 'jsonData', 'orderData', function (bdAPI, $scope, aws, DTColumnDefBuilder, jsonData, orderData) {


		
    var vm = this;
    vm.user = {
	    "name":"Chris LeFevre"
    }
		vm.order = orderData.order;
		vm.order.fitDate =  vm.order.fitDate ? vm.order.fitDate: null;
		vm.order.dob =  vm.order.dob ? vm.order.dob: null;
		vm.order.dueDate =  vm.order.dueDate ? vm.order.dueDate: null;
		
		vm.orderUser = orderData.user;
    
    //init vendors from route resolve...
    var jd = {};
		for(var i=0; i<jsonData.length; i++){
			var key = jsonData[i].config.url.replace(".json","").replace("/assets/data/", "");
			jd[key] = jsonData[i].data;
		}
		vm.data = jd;
		
		vm.timeFromNow = function(timestamp){
			return moment(timestamp).fromNow();
		}
		
		vm.timelineForm = {
			message:null
		}
		
		vm.saveOrder = function(){
			bdAPI.ordersUpdate(vm.order.orderId, vm.order).then(function(result){
				console.log("Order saved!");
				console.log(result);
			})
		}
		
    vm.addTimelineItem = function(){
	    if (!vm.timelineForm.message) return false;
	    var d = new Date();
	    if (!vm.order.timeline) vm.order.timeline = [];
	    vm.order.timeline.push(
		    {
			    "message":vm.timelineForm.message,
			    "timestamp":d.toISOString(),
			    "user": vm.user.name
		    }
	    )
	    vm.saveOrder();
	    vm.timelineForm.message = null;
    }
    
		
    
   
		
    

  }]);
