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

        // Public methods

        /**
         * @function controllers.VideosController#init
         * @description Initialization Function
         */
        function init() {
            $(".video-gallery").lightGallery({
                thumbnail: true,
                selector: ".video"
            });
        }

        init();
    }];

    app.controller('videosController', videosController);
}());