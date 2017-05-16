(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'jean', 'meanData','popups', '$filter'];
  function closetCtrl($location, jean, meanData, popups, $filter) {
    var vm = this;
		vm.popups=popups;
    vm.user = {};
		vm.jeans = [];
		vm.jean={};
		vm.data={};
		
		vm.jean=jean;
		
		//Set up customizer data...
		vm.setupData = function (func, dataKey) {
		  meanData[func]()
		   .success(function(data) {
        vm.data[dataKey] = data;
      })
      .error(function (e) {
        console.log(e);
      });
		}

		vm.setupData('getGenders', 'genders'),
		vm.setupData('getStyles', 'styles'),
		vm.setupData('getFabrics', 'fabrics'),
		vm.setupData('getThreads', 'threads'),




		vm.dataLookup = function(jeanKey, id, attr){

			if (typeof jeanKey == 'undefined' || typeof id == 'undefined') return false;
			attr = attr||null;
			
			var dataKey = (jeanKey.includes("thread") ? "threads" : jeanKey+"s");
			
			var dataSet = vm.data[dataKey];
			selected = $filter('filter')(dataSet, {id: id})[0];
			if (!attr) return selected;
			else return selected[attr];	
		}
		
		vm.copyJean = function(){
			vm.jean = jean.createNew(vm.jean);
			$location.path('/customizer');
		}
		
		meanData.getJeansByUser(1)
		  .success(function(data) {
				for (x=0; x<data.length; x++){
					vm.jeans.push(data[x]);
				}
        console.log(vm.jeans);
      })
      .error(function (e) {
        console.log(e);
      });
      
    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }
  



})();