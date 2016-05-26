(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ArtController
     * @memberof controllers
     * @description Controller for handling presentation logic in art gallery section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {services.InstagramService} instagramService - Service for handling calls to Instagram API
     */
    var artController = ['$scope', '$log', 'instagramService', function($scope, $log, instagramService) {

        // Public variables
        $scope.art = [];
        $scope.loading = true;

        // Public methods
        $scope.openPhotoSwipe = openPhotoSwipe;

        // Private variables
        var items = [];

        /**
         * @function controllers.ArtController#addToFlow
         * @description Function that takes a response from Instagram and parses the items and setups Photoswipe
         * @param {Obj} response Response object from Instagram API
         */
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
            // If pagination.next_url or pagination.next_max_tag_id exists then there are more objects to be fetched on the next page, another call must be made
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
                            html: '<div class="videoSlide"><div class="videoSlideInner"><video id="videoPlayer' + $scope.art[j].index + '" controls><source src="' +
                                $scope.art[j].video.url + '" type="video/mp4" /></video></div></div>',
                            index: $scope.art[j].index
                        });
                    }
                }

                $scope.loading = false;
            }
        }

        /**
         * @function controllers.ArtController#getAllArtFromInstagram
         * @description Function that makes a call to Instagram API to fetch data for user
         */
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

        /**
         * @function controllers.ArtController#getNextPage
         * @description Function that makes a call to Instagram API to fetch data for user with a given nextMaxId that acts as an index
         * @param {string} nextMaxId Index of items to fetch
         */
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

        /**
         * @function controllers.ArtController#getJsondata
         * @description Function that encodes response to JSON
         * @param {Obj} response Response object from Instagram API
         * @returns {object} The JSON response
         */
        function getJsondata(response) {
            var encodedResponse = JSON.parse(response);
            encodedResponse = JSON.parse(encodedResponse);

            return encodedResponse;
        }

        /**
         * @function controllers.ArtController#openPhotoSwipe
         * @description Function that opens a specific item in Photoswipe
         * @param {Obj} artItem The art item, video or image
         */
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

        /**
         * @function controllers.ArtController#init
         * @description Initialization Function
         */
        function init() {
            getAllArtFromInstagram();
        }

        init();
    }];

    app.controller('artController', artController);
}());