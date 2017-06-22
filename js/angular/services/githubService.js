(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor GithubService
     * @memberof services
     * @description Github layer
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     */
    var githubService = ['$log', '$http', function(log, $http) {

        /**
         * @function services.GithubService#getGithubApiResponseByURL
         * @description Gets response from Github API by URL
         * @param {String} url - The url
         * @return {obj} Response from Github API
         */
        var getGithubApiResponseByURL = function(url) {
            return $http({
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
                log.error('getGithubApiResponseByURL fail');
            });
        };

        return {
            getGithubApiResponseByURL: function(url) {
                return getGithubApiResponseByURL(url);
            }
        };
    }];

    app.service('githubService', githubService);
}());
