(function() {
    var app = angular.module("martinsWeb");

    var wordpressService = ['$q', '$log', '$http', function($q, log, $http) {

        var getPosts = function(blogName) {
            return $http({
                url: 'https://public-api.wordpress.com/rest/v1.1/sites/' + blogName + '.wordpress.com/posts/',
                method: "GET"
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getPosts fail');
            });
        };

        var getPostById = function(id, blogName) {
            return $http({
                url: 'https://public-api.wordpress.com/rest/v1.1/sites/' + blogName + '.wordpress.com/posts/' + id,
                method: "GET"
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getPostById fail');
            });
        };

        return {
            getPosts: function(blogName) {
                return getPosts(blogName);
            },
            getPostById: function(id, blogName) {
                return getPostById(id, blogName);
            }
        };
    }];

    app.service('wordpressService', wordpressService);
}());