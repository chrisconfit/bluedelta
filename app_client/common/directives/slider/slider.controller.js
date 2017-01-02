(function () {

  angular
    .module('meanApp')
    .controller('sliderCtrl', sliderCtrl)
	
		sliderCtrl.$inject = ['$scope', 'preloader'];

		function sliderCtrl($scope, preloader) {
			var slvm = this;

			
			$scope.imagesLoaded = false;
			console.log($scope.slides);
			
			preloader.preloadImages( $scope.slides )
			.then(function() {
				console.log("images loaded!!!");
				$scope.imagesLoaded = true;
			},
			function() {
				console.log("error loading imgaes...");
			});
		 				
				
			
			$scope.currentIndex = 0;
			
			$scope.setCurrentSlideIndex = function (index) {
			  $scope.currentIndex = index;
			};
			
			$scope.isCurrentSlideIndex = function (index) {
			  return $scope.currentIndex === index;
			};
			
			$scope.nextSlide = function () {
			  $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
			};
			
			$scope.prevSlide = function () {
			  $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
			};
				
		}

})();