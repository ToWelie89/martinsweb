(function() {
    var app = angular.module("martinsWeb");

    /**
     * @constructor BlogController
     * @memberof controllers
     * @description Controller for logic in the blog section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$location} $location - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$location}
     * @param {services.WordpressService} wordpressService - Service for handling calls to Wordpress for fetching blog data
     */
    var blogController = ['$scope', '$log', '$location', 'wordpressService', function($scope, $log, $location, wordpressService) {

        // Public variables
        $scope.posts = [];
        $scope.loading = true;

        // Public functions
        $scope.goToPost = goToPost;

        /**
         * @function controllers.BlogController#goToPost
         * @description Function for opening a blogpost by a given ID
         * @param {Obj} id The id for which blog post to redirect to
         */
        function goToPost(id) {
            $location.path('/blogPost').search({id: id});
        };

        /**
         * @function controllers.BlogController#formatPosts
         * @description Function for formating blog posts by modifying data in the model
         */
        function formatPosts() {
            angular.forEach($scope.posts, function(post) {
                post.excerpt = post.excerpt.substring(0, 150);
                post.excerpt = post.excerpt.replace(/^\s+|\s+$/g,"");

                // Get the text content of the excerpt, strip html tags like <p>
                var div = document.createElement("div");
                div.innerHTML = post.excerpt;
                post.excerpt = div.textContent || div.innerText || "";

                post.excerpt += '&#8230;';
                post.modified = post.modified.substring(0, 10);
            });

            $scope.loading = false;
        }

        /**
         * @function controllers.BlogController#init
         * @description Initilization function
         */
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