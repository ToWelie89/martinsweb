/**
 * @constructor WordpressService
 * @memberof services
 * @description Service used for fetching data from Wordpress API
 * @param {$q} $q - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$q}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
 */
export default class WordpressService {
    constructor($q, $log, $http) {
        this.$q = $q;
        this.$log = $log;
        this.$http = $http;
    }

    /**
     * @function services.WordpressService#getPosts
     * @description Get Wordpress blog posts by given blog-id
     * @param {String} blogName - The Wordpress name.
     * @return {obj} Blog posts
     */
    getPosts(blogName) {
        return this.$http({
            url: 'https://public-api.wordpress.com/rest/v1.1/sites/' + blogName + '.wordpress.com/posts/',
            method: 'GET'
        }).
        success(function(data, status, headers, config) {
            return data;
        }).
        error(function(data, status, headers, config) {
            this.$log.error('getPosts fail');
        });
    };

    /**
     * @function services.WordpressService#getPostById
     * @description Get a single Wordpress blog post by blogname and blogpost id
     * @param {String} id - Id of the blog post.
     * @param {String} blogName - The Wordpress name.
     * @return {obj} Blog post
     */
    getPostById(id, blogName) {
        return this.$http({
            url: 'https://public-api.wordpress.com/rest/v1.1/sites/' + blogName + '.wordpress.com/posts/' + id,
            method: 'GET'
        }).
        success(function(data, status, headers, config) {
            return data;
        }).
        error(function(data, status, headers, config) {
            this.$log.error('getPostById fail');
        });
    };
}
