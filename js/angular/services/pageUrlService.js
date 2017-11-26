/**
 * @constructor PageUrlService
 * @memberof services
 * @description Service used for reading page URL
 * @param {$location} $location - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$location}
 */
export default class PageUrlService {
    constructor($location) {
        this.$location = $location;
    }

    /**
     * @function services.PageUrlService#getPageName
     * @description Gets the name of the current page
     * @return {obj} The current pages name
     */
    getPageName() {
        var page = this.$location.path();
        page = page.replace('.html', '');
        page = page.replace('.php', '');
        page = page.replace('/', '');
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
    getCurrentMainPage() {
        var page = this.getPageName();
        if (page === 'start' || page === 'profile' || page === 'projects' || page === 'misc') {
            return page;
        } else if (page.includes('projects/') || page === 'flappyDoge' || page === 'gyroSnakeEditor') {
            return 'projects';
        } else if (page === 'bio' || page === 'cv') {
            return 'profile';
        } else if (page === 'blog' || page === 'art' || page === 'videos' || page === 'photos') {
            return 'misc';
        } else if (page.includes('blog/')) {
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
    getParameterValueByKey(parameterName) {
        var pageURL = this.$location.absUrl();
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

        return null;
    }
}
