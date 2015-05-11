app.service('steamService', ['$q', '$log', '$http', function($q, log, $http) {
    var getFullList = function() {
        return $http.get('./model/steamService.php').
        success(function(data, status, headers, config) {
            return data;
        }).
        error(function(data, status, headers, config) {
            log.error('getFullList fail');
        });
    };

    return {
        getFullSteamGameList: function() {
            log.debug('Getting full list of steam games');
            return getFullList();
        }
    };
}]);