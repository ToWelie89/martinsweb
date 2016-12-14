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
            $('.signature svg').each(function() {
                var delay;
                var i;
                var len;
                var length;
                var path;
                var paths;
                var previousStrokeLength;
                var results;
                var speed;
                paths = $('path, circle, rect', this);
                delay = 0;
                results = [];

                for (i = 0, len = paths.length; i < len; i++) {
                    path = paths[i];
                    length = path.getTotalLength();
                    previousStrokeLength = speed || 0;
                    speed = length < 100 ? 20 : Math.floor(length);
                    delay += previousStrokeLength + 100;
                    results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
                }
            });
            $('.signature svg').each(function() {
                var delay;
                var i;
                var len;
                var path;
                var paths;
                var results;
                var speed;
                paths = $('path, circle, rect', this);
                results = [];
                for (i = 0, len = paths.length; i < len; i++) {
                    path = paths[i];
                    length = $(path).attr('data-length');
                    speed = $(path).attr('data-speed');
                    delay = $(path).attr('data-delay');
                    results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
                }
            });
        }

        init();
    }];

    app.controller('startController', startController);
}());
