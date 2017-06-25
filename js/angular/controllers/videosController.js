/**
 * @constructor VideosController
 * @memberof controllers
 * @description Controller for handling presentation logic in art gallery section
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 */
export default class VideosController {
    /**
     * @function controllers.VideosController#constructor
     * @description Initialization Function
     */
    constructor($scope) {
        this.vm = this;
        this.vm.videos = [];

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
}
