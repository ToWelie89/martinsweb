/*app.controller('projectsController', ['$scope', '$log', function($scope, log) {
    function init() {
        log.debug('test');
    }

    init();
}]);*/

(function() {
    var app = angular.module("martinsWeb");

    var projectsController = function($scope, $log) {
        function init() {
            console.log('test');
        }

        init();
    };

    app.controller("projectsController", projectsController);
}());