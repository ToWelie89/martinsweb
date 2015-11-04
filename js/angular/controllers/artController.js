(function() {
    var app = angular.module('martinsWeb');

    var artController = ['$scope', '$log', 'instagramService', function($scope, $log, instagramService) {

        $scope.art = [];
        $scope.loading = true;

        function addToFlow(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.art.push({
                    thumbnail: response.data[i].images.thumbnail,
                    bigImage: response.data[i].images.standard_resolution,
                    link: response.data[i].link,
                    likes: response.data[i].likes.count,
                    type: response.data[i].type,
                    video: (response.data[i].type === 'video' ? response.data[i].videos.standard_resolution : null)
                });
            }

            if (response.pagination.next_url && response.pagination.next_max_tag_id) {
                getNextPage(response.pagination.next_max_tag_id);
            } else {
                $log.debug($scope.art);
                $scope.loading = false;
            }
        };

        function getAllArtFromInstagram() {
            var promise = instagramService.getMediaByTag('martinsonesson');

            var successCallback = function(response) {
                var encodedResponse = getJsondata(response.data);
                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                $log.error('getAllArtFromInstagram exception from backend');
            };

            return promise.then(successCallback, errorCallback);
        };

        function getNextPage(nextMaxId) {
            var promise = instagramService.getMediaByTagWithMaxId('martinsonesson', nextMaxId);

            var successCallback = function(response) {
                var encodedResponse = getJsondata(response.data);
                addToFlow(encodedResponse);
            };

            var errorCallback = function() {
                $log.error('getNextPage exception from backend');
            };

            return promise.then(successCallback, errorCallback);
        };

        function getJsondata(response) {
            var encodedResponse = JSON.parse(response);
            var encodedResponse = JSON.parse(encodedResponse);

            return encodedResponse;
        };

        function init() {
            getAllArtFromInstagram();
        };

        init();
    }];

    app.controller('artController', artController);
}());