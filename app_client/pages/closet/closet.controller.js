(function() {
  
  angular
    .module('bdApp')
    .controller('closetCtrl', closetCtrl);

  closetCtrl.$inject = ['$location', 'meanData'];
  function closetCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();