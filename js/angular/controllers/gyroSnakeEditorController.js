(function() {
    var app = angular.module("martinsWeb");

    var gyroSnakeEditorController = [function() {

        function init() {
            MapEditor('mapeditor');
        }

        init();
    }];

    app.controller("gyroSnakeEditorController", gyroSnakeEditorController);
}());