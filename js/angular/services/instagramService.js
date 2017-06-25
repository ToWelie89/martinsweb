/**
 * @constructor InstagramService
 * @memberof services
 * @description Instagram layer
 * @param {$q} $q - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$q}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
 */
export default class InstagramService {
    constructor($q, $log, $http) {
        this.$q = $q;
        this.$log = $log;
        this.$http = $http;
    }

    /**
     * @function services.InstagramService#getInitialSelfFlow
     * @description Gets recent flow for user by id
     * @param {String} userId - The id of the user
     * @return {obj} Recent flow of posts by user
     */
    getInitialSelfFlow(userId) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
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
            this.$log.error('getInitialSelfFlow fail');
        });
    };

    /**
     * @function services.InstagramService#getSelfFlowWithMaxId
     * @description Gets flow for user by id starting with given maxId as index
     * @param {String} userId - The id of the user
     * @param {String} maxId - Max id
     * @return {obj} Recent flow of posts by user starting with specified index
     */
    getSelfFlowWithMaxId(userId, maxId) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
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
            this.$log.error('getSelfFlowWithMaxId fail');
        });
    };

    /**
     * @function services.InstagramService#searchForUser
     * @description Search for instagram user
     * @param {String} query - Searchword
     * @return {Array} List of users matching the query
     */
    searchForUser(query) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
            data: $.param({
                action: 'search',
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
            this.$log.error('searchForUser fail');
        });
    };

    /**
     * @function services.InstagramService#getMediaByTag
     * @description Get media (images and videos) by given hashtag
     * @param {String} tag - The hashtag
     * @return {obj} Response object containing posts with the given hashtag
     */
    getMediaByTag(tag) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
            data: $.param({
                action: 'getMediaByTag',
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
            this.$log.error('getMediaByTag fail');
        });
    };

    /**
     * @function services.InstagramService#getMediaByTagWithMaxId
     * @description Get media (images and videos) by given hashtag starting with specified index
     * @param {String} maxId - Starting index
     * @param {String} tag - The hashtag
     * @return {obj} Response object containing posts with the given hashtag with given starting index
     */
    getMediaByTagWithMaxId(tag, maxId) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
            data: $.param({
                action: 'getMediaByTagWithMaxId',
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
            this.$log.error('getMediaByTagWithMaxId fail');
        });
    };

    /**
     * @function services.InstagramService#getUserInformation
     * @description Get information about an Instagram user
     * @param {String} userId - The id of the user
     * @return {obj} Response object containing user information
     */
    getUserInformation(userId) {
        return this.$http({
            url: './model/instagramService.php',
            method: 'POST',
            data: $.param({
                action: 'getUserInformation',
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
            this.$log.error('getUserInformation fail');
        });
    };
}
