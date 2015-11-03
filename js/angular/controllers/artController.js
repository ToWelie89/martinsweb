(function() {
    var app = angular.module('martinsWeb');

    var artController = ['$scope', '$log', function($scope, $log) {

        $scope.art = [];

        function addToFlow(response) {
            $scope.art += response.data;

            if (response.pagination.next_url && response.pagination.next_max_id) {
                getNextPage(response.pagination.next_max_id);
            }
        }

        function getAllArtFromInstagram() {
            var successCallback = function(response) {
                var encodedResponse = JSON.parse(response.data);
                var encodedResponse = JSON.parse(encodedResponse);

                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                log.error(':(');
            };

            return promise.then(successCallback, errorCallback);
        }

        function getNextPage(nextMaxId) {
            var promise = instagramService.getSelfFlowWithMaxId($scope.userId, nextMaxId);

            var successCallback = function(response) {
                var encodedResponse = JSON.parse(response.data);
                var encodedResponse = JSON.parse(encodedResponse);

                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                log.error(':(');
            };

            return promise.then(successCallback, errorCallback);
        };

        function init() {
            getAllArtFromInstagram();
        }

        init();
    }];

    app.controller('artController', artController);
}());