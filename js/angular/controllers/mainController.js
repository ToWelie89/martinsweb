(function() {
    var app = angular.module("martinsWeb");

    /**
     * @constructor MainController
     * @memberof controllers
     * @description Main controller for the whole site
     */
    var mainController = ['$scope', function($scope) {
        $scope.$on('$routeChangeStart', function(next, current) {
            console.log('Route changed');
        });
    }];

    app.controller("mainController", mainController);
}());