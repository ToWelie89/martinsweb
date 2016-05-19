(function() {
    var app = angular.module('martinsWeb');

    var artController = ['$scope', '$log', 'instagramService', function($scope, $log, instagramService) {

        $scope.art = [];
        $scope.loading = true;

        var items = [];

        // Public methods
        $scope.openPhotoSwipe = openPhotoSwipe;

        function addToFlow(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.art.push({
                    thumbnail: response.data[i].images.thumbnail,
                    bigImage: response.data[i].images.standard_resolution,
                    link: response.data[i].link,
                    likes: response.data[i].likes.count,
                    type: response.data[i].type,
                    video: (response.data[i].type === 'video' ? response.data[i].videos.standard_resolution : null),
                    index: $scope.art.length
                });
            }

            if (response.pagination.next_url && response.pagination.next_max_tag_id) {
                getNextPage(response.pagination.next_max_tag_id);
            } else {
                $log.debug($scope.art);

                for (var j = 0; j < $scope.art.length; j++) {
                    if (!$scope.art[j].video) {
                        items.push({
                            src: $scope.art[j].bigImage.url,
                            w: $scope.art[j].bigImage.width,
                            h: $scope.art[j].bigImage.height,
                            index: $scope.art[j].index
                        });
                    } else {
                        items.push({
                            html: '<div class="videoSlide"><video width="100%" height="100%" id="videoPlayer' + $scope.art[j].index + '" controls><source src="' +
                                $scope.art[j].video.url + '" type="video/mp4" /></video></div>',
                            index: $scope.art[j].index
                        });
                    }
                }

                $scope.loading = false;
            }
        }

        function getAllArtFromInstagram() {
            var promise = instagramService.getMediaByTag('martinsonesson');

            var successCallback = function(response) {
                var encodedResponse = getJsondata(response.data);
                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                $log.error('getAllArtFromInstagram exception from backend');
            };

            return promise.then(successCallback, errorCallback);
        }

        function getNextPage(nextMaxId) {
            var promise = instagramService.getMediaByTagWithMaxId('martinsonesson', nextMaxId);

            var successCallback = function(response) {
                var encodedResponse = getJsondata(response.data);
                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                $log.error('getNextPage exception from backend');
            };

            return promise.then(successCallback, errorCallback);
        }

        function getJsondata(response) {
            var encodedResponse = JSON.parse(response);
            encodedResponse = JSON.parse(encodedResponse);

            return encodedResponse;
        }

        function openPhotoSwipe(artItem) {
            var pswpElement = document.querySelectorAll('.pswp')[0];

            // define options (if needed)
            var options = {
                // history & focus options are disabled on CodePen
                history: false,
                focus: false,
                index: artItem.index,

                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        }

        function init() {
            getAllArtFromInstagram();
        }

        init();
    }];

    app.controller('artController', artController);
}());