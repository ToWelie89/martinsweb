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

        return {
            getCurrentMainPage: getCurrentMainPage
        };
    }];

    app.service('pageUrlService', pageUrlService);
}());