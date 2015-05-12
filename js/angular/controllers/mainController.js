(function() {
    var app = angular.module("martinsWeb");

    var mainController = ['$scope', '$location', 'pageUrlService', function($scope, $location, pageUrlService) {

        $scope.getCurrentSubPageName = function() {
            var page = pageUrlService.getPageName();

            if (page === 'bio' || page === 'cv' || page === 'blog' || page === 'art' || page === 'videos' || page === 'photos') {
                return page;
            } else {
                return 'NONE';
            }
        }

        $scope.getCurrentMainPage = function() {
            var page = pageUrlService.getPageName();
            if (page === 'start' || page === 'profile' || page === 'projects' || page === 'misc') {
                return page;
            } else if (page === 'bio' || page === 'cv') {
                return 'profile';
            } else if (page === 'blog' || page === 'art' || page === 'videos' || page === 'photos') {
                return 'misc';
            } else {
                return 'NONE';
            }
        }
    }];

    app.controller("mainController", mainController);
}());