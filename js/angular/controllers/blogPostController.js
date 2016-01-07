(function() {
    var app = angular.module("martinsWeb");

    var blogPostController = ['$scope', '$log', 'wordpressService', function($scope, $log, wordpressService) {

        $scope.loading;

        function init() {
            $scope.loading = false;
        }

        init();
    }];

    app.controller("blogPostController", blogPostController);
}());