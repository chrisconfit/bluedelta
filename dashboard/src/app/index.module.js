(function() {
  'use strict';

  angular
    .module('inspinia', [ 'oc.lazyLoad', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'user', 'api'])
    .filter('paginate', function() {
		  return function(input, limit, begin) {
			  if (!input)return false;
			  console.log("input");
				console.log(input.slice(begin, begin + limit));
		    return input.slice(begin, begin + limit);
		  };
	  })
	  .filter('dateInMillis', function() {
	    return function(dateString) {
	      return Date.parse(dateString);
	    };
	  });

})();
