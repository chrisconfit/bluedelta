(function () {

  angular
    .module('bdApp')
    .controller('socialCtrl', socialCtrl)
	
		socialCtrl.$inject = ['$scope', 'popups'];

		
		function socialCtrl($scope, popups) {
	
			var sovm = this;
			sovm.jean = $scope.jean;
			
			console.log("jean!");
			console.log(sovm.jean);
			
			sovm.jeanToUrl = function(){
				var url = document.location.origin+"/customizer/";
				console.log("jeantoURL");
				console.log(sovm.jean);
				if (!sovm.jean.id){
					url += "tt:"+sovm.jean.top_thread_id;
					url += "-tb:"+sovm.jean.bottom_thread_id;
					url += "-ta:"+sovm.jean.accent_thread_id;
					url += "-f:"+sovm.jean.fabric_id;
					url += "-s:"+sovm.jean.style_option_id;
					url += "-g:"+sovm.jean.gender_option_id;
					console.log("url!!");
					console.log(url);
				}
				else url += sovm.jean.id;	
				url += "/copy";
				return url;
			}
			
			var sharingUrls = {};
			
			var socialTitle = "Check out my custom jeans built with Blue Delta!";
			var socialDescription = "Cras justo odio, dapibus ac facilisis in, egestas eget quam.";

			//Facebook sharing URL
			sharingUrls.facebook = function(url, image){
				if (!url) return false;
				var baseString = 'https://www.facebook.com/sharer/sharer.php?u='+url+'&description='+socialDescription+'&title='+socialTitle;
				if (image) baseString += '&images='+urlencode(image);
				return baseString;
			}
			
			//Twitter sharing URL
			sharingUrls.twitter = function(url){
				if (!url) return false;
				return 'http://twitter.com/home?status='+socialTitle+'-'+url;
			}
			
			//Email sharing URL
			sharingUrls.email = function(url){
				return "mailto:?&subject="+socialTitle+"&body="+socialDescription+" - "+url;
			}
			
			//Pinterest sharing URL
			sharingUrls.pinterest = function (url, image){
				if(url || image) return false;
				return 'https://pinterest.com/pin/create/button/?url='+url+'&media='+image+'&description='+socialTitle+'%0A'+socialDescription;	
			}
			console.log($scope);
			sovm.share = function(social){
				var url = sharingUrls[social](sovm.jeanToUrl());
				if (url !== false){
					if (social=='email') window.open(url, '_self');
					else window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				}
				else console.log("Error builiding social URL");
				return false;
			};
		
		}	
			
})();