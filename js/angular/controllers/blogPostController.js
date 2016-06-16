(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor BlogPostController
     * @memberof controllers
     * @description Controller for logic in the blog post section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {services.WordpressService} wordpressService - Service for handling calls to Wordpress for fetching blog data
     * @param {services.PageUrlService} pageUrlService - Service for reading GET-parameters from the URL
     */
    var blogPostController = ['$scope', '$log', 'wordpressService', 'pageUrlService', function($scope, $log, wordpressService, pageUrlService) {

        // Private variables
        var blogId;

        // Public variables
        $scope.loading = true;
        $scope.post = {};

        /**
         * @function controllers.BlogPostController#getBlogPost
         * @description Function for getting a blog post from Wordpress by given id
         * @param {Obj} id The id for the blog post
         */
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

        /**
         * @function controllers.BlogPostController#setWatch
         * @description Function for setting watchers
         */
        function setWatch() {
            $scope.$watch('post', function() {
                $log.debug('Blog post changed');
                setTimeout(function() {
                    SyntaxHighlighter.highlight();
                }, 200);
            });
        }

        /**
         * @function controllers.BlogPostController#init
         * @description Initilization function
         */
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

    app.controller('blogPostController', blogPostController);
}());