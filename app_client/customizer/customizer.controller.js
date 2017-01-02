(function() {
  
  angular
    .module('meanApp')
    .controller('customizerCtrl', customizerCtrl);

  customizerCtrl.$inject = ['$location', 'meanData', 'jean'];
  function customizerCtrl($location, meanData, jean) {
    var vm = this;
		vm.jean = jean;
		
		vm.form = {};
    
    vm.jean.step = (jean.step ? jean.step : 1);

		vm.form.steps = [];
    vm.form.steps[1] = {
	    "template": "/customizer/form-templates/gender.html",
	    "title" : "Gender"
    };
    vm.form.steps[2] = {
	    "template": "/customizer/form-templates/style.html",
	    "title" : "Style"
    };
    vm.form.steps[3] = {
	    "template": "/customizer/form-templates/build.html",
	    "title" : "Build"
    };

    vm.form.nextStep = function(){
	    vm.jean.step =	vm.jean.step + 1;  
    }
    
	  vm.form.selectStyle = function(id){
	    vm.jean.data.style =	id;
	    vm.form.nextStep();
    }    
    
    //Styles
    vm.styles = {
	    "male" : [],
	    "female" : []
    }
    
    vm.styles.male = [
	    {
		    "title":"Straight",
		    "id" : 1,
		    "images" : [
					"/images/straight-1.jpg",
					"/images/straight-2.jpg",
					"/images/straight-3.jpg"
		    ]
	    },
	    {
				"title":"Bootcut",
				"id" : 2,
		    "images" : [
					"/images/bootcut-1.jpg",
					"/images/bootcut-2.jpg",
					"/images/bootcut-3.jpg"
		    ]
	    },
	    {
		    "title":"Skinny",
		    "id":3,
		    "images" : [
					"/images/skinny-1.jpg",
					"/images/skinny-2.jpg",
					"/images/skinny-3.jpg"
		    ]
	    }
    ];
    
    vm.styles.female = [
	    {
		    "title":"Skinny",
		    "images" : [
					"http://placehold.it/300x500",
					"http://placehold.it/301x501",
					"http://placehold.it/302x502"
		    ]
	    },
	    {
		    "title":"Boot-Cut",
		    "images" : [
					"http://placehold.it/300x500",
					"http://placehold.it/301x501",
					"http://placehold.it/302x502"
		    ]
	    },
	    {
		    "title":"Straight",
		    "images" : [
					"http://placehold.it/300x500",
					"http://placehold.it/301x501",
					"http://placehold.it/302x502"
		    ]
	    }
    ];
    
  }

})();