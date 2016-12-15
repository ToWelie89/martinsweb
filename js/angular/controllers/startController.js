(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor StartController
     * @memberof controllers
     * @description Controller for main page
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     */
    var startController = ['$scope', function($scope) {

        // Public variables

        /**
         * @function controllers.StartController#init
         * @description Initilization function
         */
        function init() {
            var delay;
            var length;
            var paths;
            var previousStrokeLength;
            var speed;
            paths = $('path, circle, rect');
            delay = 0;

            paths.each(function() {
                length = $(this).get(0).getTotalLength();
                previousStrokeLength = speed || 0;
                speed = length < 100 ? 20 : Math.floor(length);
                delay += previousStrokeLength + 100;
                $(this).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length);
            });

            paths.each(function() {
                length = $(this).attr('data-length');
                speed = $(this).attr('data-speed');
                delay = $(this).attr('data-delay');
                $(this).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0');
            });
        }

        init();
    }];

    app.controller('startController', startController);
}());
