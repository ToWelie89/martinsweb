/*
    IMPORTS
*/

import {BLOG_POSTS} from './../../configFiles/blogPosts';

/**
 * @constructor BlogController
 * @memberof controllers
 * @description Controller for logic in the blog section
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 * @param {$location} $location - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$location}
 * @param {services.WordpressService} wordpressService - Service for handling calls to Wordpress for fetching blog data
 */
export default class BlogController {
    constructor($scope, $log, $location, wordpressService) {
        this.vm = this;

        this.$log = $log;
        this.$location = $location;
        this.wordpressService = wordpressService;

        // Public variables
        this.vm.posts = [];
        this.vm.loading = true;

        // Public functions
        this.vm.goToPost = this.goToPost;

        this.vm.loading = true;

        this.wordpressService.getPosts('martinsonesson').then(resp => {
            this.$log.debug(resp.data.posts);
            this.vm.posts = resp.data.posts;
            this.formatPosts();
        }).catch(err => {
            this.$log.error('getPosts exception');
            this.vm.loading = false;
        });
    }

    /**
     * @function controllers.BlogController#goToPost
     * @description Function for opening a blogpost by a given ID
     * @param {Obj} id The id for which blog post to redirect to
     */
    goToPost(id) {
        const blogPost = BLOG_POSTS.find(blogPost => blogPost.id === id);
        this.$location.path(`/blog/${blogPost.name}`);
    };

    /**
     * @function controllers.BlogController#formatPosts
     * @description Function for formating blog posts by modifying data in the model
     */
    formatPosts() {
        this.vm.posts.forEach(post => {
            post.excerpt = post.excerpt.substring(0, 150);
            post.excerpt = post.excerpt.replace(/^\s+|\s+$/g, '');

            // Get the text content of the excerpt, strip html tags like <p>
            var div = document.createElement('div');
            div.innerHTML = post.excerpt;
            post.excerpt = div.textContent || div.innerText || '';

            post.excerpt += '&#8230;';
            post.modified = post.modified.substring(0, 10);
        });

        this.vm.loading = false;
    }
}
