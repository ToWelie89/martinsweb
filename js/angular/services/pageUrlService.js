(function() {
    var app = angular.module("martinsWeb");

    /**
     * @constructor PageUrlService
     * @memberof services
     * @description Service used for reading page URL
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$location} $location - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$location}
     */
    var pageUrlService = ['$log', '$location', function(log, $location) {

        /**
         * @function services.PageUrlService#getPageName
         * @description Gets the name of the current page
         * @return {obj} The current pages name
         */
        function getPageName() {
            var page = $location.path();
            page = page.replace(".html", "");
            page = page.replace(".php", "");
            page = page.replace("/", "");
            if (page === '') {
                page = 'start';
            }
            return page;
        }

        /**
         * @function services.PageUrlService#getCurrentMainPage
         * @description Gets the current MAIN page category like MISC or PROFILE.
         * @return {String} The current pages main category name
         */
        function getCurrentMainPage() {
            var page = getPageName();
            if (page === 'start' || page === 'profile' || page === 'projects' || page === 'misc') {
                return page;
            } else if (page === 'bio' || page === 'cv') {
                return 'profile';
            } else if (page === 'blogPost' || page === 'blog' || page === 'art' || page === 'videos' || page === 'photos') {
                return 'misc';
            } else {
                return 'NONE';
            }
        }

        /**
         * @function services.PageUrlService#getParameterValueByKey
         * @description Gets the GET-parameter value by key by reading the URL
         * @param {String} parameterName - The key of parameter
         * @return {String} The value of the given parameter key
         */
        function getParameterValueByKey(parameterName) {
            var pageURL = $location.absUrl();
            var parameters = pageURL.split('?')[1];

            if (parameters) {
                parameters = parameters.split('&');
                for (var i = 0, max = parameters.length; i < max; i++) {
                    var paramPair = parameters[i].split('=');
                    if (paramPair[0] === parameterName) {
                        return paramPair[1];
                    }
                }
            }

            log.debug('URL parameter ', parameterName, ' not found');
            return null;
        }

        return {
            getCurrentMainPage: getCurrentMainPage,
            getParameterValueByKey: getParameterValueByKey
        };
    }];

    app.service('pageUrlService', pageUrlService);
}());