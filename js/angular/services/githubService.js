/**
 * @constructor GithubService
 * @memberof services
 * @description Github layer
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
 */
export default class GithubService {
    constructor($log, $http) {
        this.$log = $log;
        this.$http = $http;
    }

    /**
     * @function services.GithubService#getGithubApiResponseByURL
     * @description Gets response from Github API by URL
     * @param {String} url - The url
     * @return {obj} Response from Github API
     */
    getGithubApiResponseByURL(url) {
        return this.$http({
            url: './model/githubService.php',
            method: 'POST',
            data: $.param({
                url: url
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
        success(function(data, status, headers, config) {
            return data;
        }).
        error(function(data, status, headers, config) {
            this.$log.error('getGithubApiResponseByURL fail');
        });
    };
}
