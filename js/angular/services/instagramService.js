(function() {
    var app = angular.module("martinsWeb");

    /**
     * @constructor InstagramService
     * @memberof services
     * @description Instagram layer
     * @param {$q} $q - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$q}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     */
    var instagramService = ['$q', '$log', '$http', function($q, log, $http) {

        /**
         * @function services.InstagramService#getInitialSelfFlow
         * @description Gets recent flow for user by id
         * @param {String} userId - The id of the user
         * @return {obj} Recent flow of posts by user
         */
        var getInitialSelfFlow = function(userId) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getInitialSelfFlow fail');
            });
        };

        /**
         * @function services.InstagramService#getSelfFlowWithMaxId
         * @description Gets flow for user by id starting with given maxId as index
         * @param {String} userId - The id of the user
         * @param {String} maxId - Max id
         * @return {obj} Recent flow of posts by user starting with specified index
         */
        var getSelfFlowWithMaxId = function(userId, maxId) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    maxId: maxId,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getSelfFlowWithMaxId fail');
            });
        };

        /**
         * @function services.InstagramService#searchForUser
         * @description Search for instagram user
         * @param {String} query - Searchword
         * @return {Array} List of users matching the query
         */
        var searchForUser = function(query) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    action: "search",
                    query: query
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('searchForUser fail');
            });
        };

        /**
         * @function services.InstagramService#getMediaByTag
         * @description Get media (images and videos) by given hashtag
         * @param {String} tag - The hashtag
         * @return {obj} Response object containing posts with the given hashtag
         */
        var getMediaByTag = function(tag) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    action: "getMediaByTag",
                    tag: tag
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getMediaByTag fail');
            });
        };

        /**
         * @function services.InstagramService#getMediaByTagWithMaxId
         * @description Get media (images and videos) by given hashtag starting with specified index
         * @param {String} maxId - Starting index
         * @param {String} tag - The hashtag
         * @return {obj} Response object containing posts with the given hashtag with given starting index
         */
        var getMediaByTagWithMaxId = function(tag, maxId) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    action: "getMediaByTagWithMaxId",
                    tag: tag,
                    maxId: maxId
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getMediaByTagWithMaxId fail');
            });
        };

        /**
         * @function services.InstagramService#getUserInformation
         * @description Get information about an Instagram user
         * @param {String} userId - The id of the user
         * @return {obj} Response object containing user information
         */
        var getUserInformation = function(userId) {
            return $http({
                url: './model/instagramService.php',
                method: "POST",
                data: $.param({
                    action: "getUserInformation",
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                log.error('getUserInformation fail');
            });
        };

        return {
            getInitialSelfFlow: function(userId) {
                return getInitialSelfFlow(userId);
            },
            getSelfFlowWithMaxId: function(userId, maxId) {
                return getSelfFlowWithMaxId(userId, maxId);
            },
            searchForUser: function(query) {
                return searchForUser(query);
            },
            getUserInformation: function(userId) {
                return getUserInformation(userId);
            },
            getMediaByTag: function(tag) {
                return getMediaByTag(tag);
            },
            getMediaByTagWithMaxId: function(tag, maxId) {
                return getMediaByTagWithMaxId(tag, maxId);
            }
        };
    }];

    app.service('instagramService', instagramService);
}());