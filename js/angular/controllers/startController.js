/**
 * @constructor StartController
 * @memberof controllers
 * @description Controller for main page
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 */
export default class StartController {
    /**
     * @function controllers.StartController#constructor
     * @description Initilization function
     */
    constructor($scope) {
        $('.signature svg').each(function() {
            var delay, i, len, length, path, paths, previousStrokeLength, results, speed;
            paths = $('path, circle, rect', this);
            delay = 0;
            results = [];
            for (i = 0, len = paths.length; i < len; i++) {
                path = paths[i];
                length = path.getTotalLength();
                previousStrokeLength = speed || 0;
                speed = length < 40 ? 20 : Math.floor(length);
                delay += previousStrokeLength + 40;
                results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
            }
        });

        $('.signature svg').each(function() {
            var delay, i, len, length, path, paths, results, speed;
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
}