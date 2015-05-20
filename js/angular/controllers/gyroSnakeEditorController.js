(function() {
    var app = angular.module("martinsWeb");

    var gyroSnakeEditorController = ['$scope', function($scope) {

        function init() {
            MapEditor('mapeditor');
        }

        init();
    }];

    app.controller("gyroSnakeEditorController", gyroSnakeEditorController);
}());