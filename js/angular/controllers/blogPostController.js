/*
    IMPORTS
*/

import {BLOG_POSTS} from './../../configFiles/blogPosts';
import {isNumeric} from './../../helpers/helpers'

/**
 * @constructor BlogPostController
 * @memberof controllers
 * @description Controller for logic the blog post page
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 * @param {services.WordpressService} wordpressService - Service for handling calls to Wordpress for fetching blog data
 */
export default class BlogPostController {
    constructor($scope, $log, wordpressService, $routeParams) {
        this.vm = this;

        this.$routeParams = $routeParams;
        this.wordpressService = wordpressService;
        this.$log = $log;
        this.$scope = $scope;

        // Private variables
        this.blogId;

        // Public variables
        this.vm.loading = true;
        this.vm.post = {};

        this.vm.loading = true;
        this.setWatch();

        if (this.$routeParams.blogName) {
            if (isNumeric(this.$routeParams.blogName)) {
                this.getBlogPost(this.$routeParams.blogName);
            } else {
                const blogPost = BLOG_POSTS.find(b => b.name === this.$routeParams.blogName);
                this.getBlogPost(blogPost.id);
            }
        } else {
            this.vm.loading = false;
        }
    }

    /**
     * @function controllers.BlogPostController#getBlogPost
     * @description Function for getting a blog post from Wordpress by given id
     * @param {Obj} id The id for the blog post
     */
    getBlogPost(id) {
        this.wordpressService.getPostById(id, 'martinsonesson')
            .then(response => {
                this.$log.debug(response.data);
                this.vm.post = response.data;
            })
            .catch(err => {
                this.$log.error('getBlogPost exception');
            })
            .finally(() => {
                this.vm.loading = false;
            });
    }

    /**
     * @function controllers.BlogPostController#setWatch
     * @description Function for setting watchers
     */
    setWatch() {
        this.$scope.$watch('post', () => {
            this.$log.debug('Blog post changed');
            setTimeout(() => {
                SyntaxHighlighter.highlight();
                // $('div[id^="high"]').css('overflow-x', 'scroll');
                $('div[id^="high"]').on(
                    {
                        'touchstart': () => {
                            $(this).css('overflow-x', 'scroll');
                            $(this).find('.line').css('white-space', 'pre');
                        }
                    }
                );
            }, 500);
        });
    }
}
