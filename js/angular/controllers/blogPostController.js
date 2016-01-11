(function() {
    var app = angular.module("martinsWeb");

    var blogPostController = ['$scope', '$log', 'wordpressService', 'pageUrlService', function($scope, $log, wordpressService, pageUrlService) {

        var blogId;

        $scope.loading;
        $scope.post;

        function getBlogPost(id) {
            var promise = wordpressService.getPostById(id, 'martinsonesson');

            var successCallback = function(response) {
                $log.debug(response.data);
                $scope.post = response.data;

                $scope.loading = false;
            };

            var errorCallback = function() {
                $log.error('getBlogPost exception');
                $scope.loading = false;
            };

            return promise.then(successCallback, errorCallback);
        }

        function setWatch() {
            $scope.$watch('post', function() {
                $log.debug('post changed');
                setTimeout(function() {
                    SyntaxHighlighter.highlight();
                }, 100);
            });
            $scope.$watch('loading', function() {
                SyntaxHighlighter.highlight();
            });
        }

        function init() {
            $scope.loading = true;

            setWatch();

            blogId = pageUrlService.getParameterValueByKey('id');
            if (blogId) {
                getBlogPost(blogId);
            } else {
                $scope.loading = false;
            }
        }

        init();
    }];

    app.controller("blogPostController", blogPostController);
}());