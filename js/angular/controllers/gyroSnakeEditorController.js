(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor GyroSnakeEditorController
     * @memberof controllers
     * @description Controller Gyro Snake Editor page
     */
    var gyroSnakeEditorController = [function() {

        /**
         * @function controllers.GyroSnakeEditorController#init
         * @description Initilization function
         */
        function init() {
            MapEditor('mapeditor');
        }

        init();
    }];

    app.controller('gyroSnakeEditorController', gyroSnakeEditorController);
}());
