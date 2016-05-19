(function() {
    var app = angular.module("martinsWeb");

    var blogController = ['$scope', '$log', '$location', 'wordpressService', function($scope, $log, $location, wordpressService) {

        $scope.posts = [];
        $scope.loading = true;

        $scope.goToPost = function(id) {
            $location.path('/blogPost').search({id: id});
        };

        function formatPosts() {
            angular.forEach($scope.posts, function(post) {
                post.excerpt = post.excerpt.substring(0, 150) + ' . . . . . . ';
                post.modified = post.modified.substring(0, 10);
            });

            $scope.loading = false;
        }

        function init() {
            $scope.loading = true;

            var promise = wordpressService.getPosts('martinsonesson');

            var successCallback = function(response) {
                $log.debug(response.data.posts);
                $scope.posts = response.data.posts;
                formatPosts();
            };

            var errorCallback = function() {
                $log.error('getPosts exception');
                $scope.loading = false;
            };

            return promise.then(successCallback, errorCallback);
        }

        init();
    }];

    app.controller("blogController", blogController);
}());