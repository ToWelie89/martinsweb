(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor VideosController
     * @memberof controllers
     * @description Controller for handling presentation logic in art gallery section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     */
    var videosController = ['$scope', function($scope) {

        // Public variables
        $scope.videos = [];

        // Public methods

        /**
         * @function controllers.VideosController#init
         * @description Initialization Function
         */
        function init() {
            $('.video-gallery').lightGallery({
                thumbnail: true,
                selector: '.video',
                zoom: false,
                pager: false,
                share: false,
                downloadUrl: false,
                download: false,
                autoplay: false,
                autoplayControls: false,
                /* youtubePlayerParams: {
                    autoplay: 1
                }*/
                videoAutoplay: true
            });
        }

        /* function pauseAllYoutube() {
            $('iframe[src*="youtube.com"]').each(function() {
                var iframe = $(this)[0].contentWindow;
                iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            });
        }*/

        init();
    }];

    app.controller('videosController', videosController);
}());
