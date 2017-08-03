(function () {

  angular
    .module('bdApp')
    .controller('socialCtrl', socialCtrl)
	
		socialCtrl.$inject = ['jean'];

		
		function socialCtrl(jean) {
	
			var sovm = this;
			sovm.jean = jean;
			
			
			sovm.jeanToUrl = function(){
				var url = document.location.origin+"/customizer/d";	
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

			sovm.share = function(social){
				var url = sharingUrls[social](sovm.jeanToUrl());
				if (url !== false){
					if (social=='email') window.open(url, '_self');
					else window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
				}
				else console.log("Error builiding social URL");
				return false;
			}
		
		}	
			
})();