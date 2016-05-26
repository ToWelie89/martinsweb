(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor BioController
     * @memberof controllers
     * @description Controller for logic in the bio section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {services.MediaQueryService} mediaQueryService - Service handling media query breakpoints
     */
    var bioController = ['$scope', 'mediaQueryService', function($scope, mediaQueryService) {

        /**
         * @function controllers.BioController#mouseOver
         * @description Mouseover event function for when mousing over social media icon
         */
        function mouseOver() {
            if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.LARGE)
            {
                $('#previewTitle').stop(true, true);
                var text = $(this).attr('displayText');
                $('#previewTitle').text(text);
                $('#previewTitle').fadeIn(600);
            }
        }

        /**
         * @function controllers.BioController#mouseOut
         * @description Mouseout event function for when mousing out from social media icon
         */
        function mouseOut() {
            if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.LARGE)
            {
                $('#previewTitle').fadeOut(300);
            }
        }

        /**
         * @function controllers.BioController#init
         * @description Initilization function
         */
        function init() {
            $('#linksInnerContainer a').hover(mouseOver, mouseOut);
        }

        init();
    }];

    app.controller('bioController', bioController);
}());