(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor VideosController
     * @memberof controllers
     * @description Controller for handling presentation logic in art gallery section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     */
    var videosController = ['$scope', '$log', '$http', function($scope, $log, $http) {

        // Public variables
        $scope.videos = [];
        $scope.loading = true;

        // Public methods
        $scope.openPhotoSwipe = openPhotoSwipe;

        /**
         * @function controllers.VideosController#formatArt
         * @description Function reads the data and generates list used for view and photoswipe
         * @param {Obj} response The data containing all video information
         */
        function formatVideos(response) {
            for (var i = 0; i < response.categories.length; i++) {
                $scope.videos.push({
                    name: response.categories[i].name,
                    videos: []
                });
                for (var j = 0; j < response.categories[i].videos.length; j++) {
                    $scope.videos[i].videos.push({
                        html: '<div class="videoSlide"><div class="videoSlideInner"><iframe width="560" height="315" src="' + response.categories[i].videos[j].oldurl +
                              '" frameborder="0" allowfullscreen></iframe></div></div>',
                        index: response.categories[i].videos[j].index,
                        title: 'Slide right or left to change item. Slide down or up to close current item.',
                        thumbnail: response.categories[i].videos[j].thumbnail
                    });
                }
            }

            $log.debug($scope.videos);
            $scope.loading = false;
        }

        /**
         * @function controllers.VideosController#openPhotoSwipe
         * @description Function that opens a specific item in Photoswipe
         * @param {Obj} artItem The art item, video or image
         */
        function openPhotoSwipe(video, category) {
            var pswpElement = document.querySelectorAll('.pswp')[0];

            // define options (if needed)
            var options = {
                // history & focus options are disabled on CodePen
                history: false,
                focus: false,
                index: video.index - 1,

                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, category.videos, options);
            gallery.init();
        }

        /**
         * @function controllers.VideosController#init
         * @description Initialization Function
         */
        function init() {
            $http.get('json/videos.json').success(function(data) {
                formatVideos(data);
            });
        }

        init();
    }];

    app.controller('videosController', videosController);
}());