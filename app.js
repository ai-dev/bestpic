var cb;

(function(){
	var app = angular.module('BestPic', []);

	// The service that takes the pictures
	app.factory('flickr', function($q){
  		return {
    		getPictures: function(){
      			var deferred = $q.defer();
 
    			cb = function(data) {
					deferred.resolve(data.items);
				};

    			var tags='london';
				var script=document.createElement('script');
				script.src=
				'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags='+tags;
				document.head.appendChild(script);

				return deferred.promise;
    		}
  		};
	});

	app.controller('HomeController', ['$scope', 'flickr', function($scope, flickr) {
		flickr.getPictures().then(function(pictures) {
			console.log(pictures);

			pictures.forEach(function(picture) {
				if(localStorage[picture.media.m]) {
					picture.bestPicFavorite = true;
				}
			});
			$scope.pictures = pictures;
		});

		$scope.favoriteToggle = function(index) {
			$scope.pictures[index].bestPicFavorite = !$scope.pictures[index].bestPicFavorite;

			if($scope.pictures[index].bestPicFavorite) {
				localStorage[$scope.pictures[index].media.m] = 1;
			} else {
				delete localStorage[$scope.pictures[index].media.m];
			}
		};
	}]);
})();

