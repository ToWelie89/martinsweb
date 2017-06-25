export default class BlogPostController {
    constructor($scope, $log, wordpressService, pageUrlService) {
        this.vm = this;

        this.pageUrlService = pageUrlService;
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

        this.blogId = this.pageUrlService.getParameterValueByKey('id');
        if (this.blogId) {
            this.getBlogPost(this.blogId);
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
