(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ArtController
     * @memberof controllers
     * @description Controller for handling presentation logic in art gallery section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     */
    var artController = ['$scope', '$log', '$http', function($scope, $log, $http) {

        // Public variables
        $scope.art = [];
        $scope.loading = true;

        // Public methods
        $scope.openPhotoSwipe = openPhotoSwipe;

        // Private variables
        var items = [];

        /**
         * @function controllers.ArtController#formatArt
         * @description Function reads the data and generates list used for view and photoswipe
         * @param {Obj} response The data containing all art information
         */
        function formatArt(response) {
            for (var i = 0; i < response.length; i++) {
                $scope.art.push({
                    thumbnail: response[i].thumbnail,
                    bigImage: response[i].bigImage,
                    video: (response[i].video ? response[i].video : null),
                    index: $scope.art.length,
                    width: response[i].width,
                    height: response[i].height
                });
            }

            $log.debug($scope.art);

            for (var j = 0; j < $scope.art.length; j++) {
                if (!$scope.art[j].video) {
                    items.push({
                        src: $scope.art[j].bigImage,
                        w: $scope.art[j].width,
                        h: $scope.art[j].height,
                        index: $scope.art[j].index,
                        title: 'Slide right or left to change item. Slide down or up to close current item.'
                    });
                } else {
                    items.push({
                        html: '<div class="videoSlide"><div class="videoSlideInner"><video id="videoPlayer' + $scope.art[j].index + '" controls><source src="' +
                            $scope.art[j].video + '" type="video/mp4" /></video></div></div>',
                        index: $scope.art[j].index,
                        title: 'Slide right or left to change item. Slide down or up to close current item.'
                    });
                }
            }

            $scope.loading = false;
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
            $http.get('json/art.json').success(function(data) {
                formatArt(data);
            });
        }

        init();
    }];

    app.controller('artController', artController);
}());
