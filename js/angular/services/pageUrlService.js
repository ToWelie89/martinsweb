(function() {
    var app = angular.module("martinsWeb");

    var pageUrlService = ['$log', '$location', function(log, $location) {

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

        function getCurrentMainPage() {
            var page = getPageName();
            if (page === 'start' || page === 'profile' || page === 'projects' || page === 'misc') {
                return page;
            } else if (page === 'bio' || page === 'cv') {
                return 'profile';
            } else if (page === 'blog' || page === 'art' || page === 'videos' || page === 'photos') {
                return 'misc';
            } else {
                return 'NONE';
            }
        }

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