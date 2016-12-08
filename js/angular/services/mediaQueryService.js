(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor MediaQueryService
     * @memberof services
     * @description Service used for handling responsive breakpoints
     */
    var mediaQueryService = [function() {

        // Private variables
        var breakPoints = {
            SMALL: 'SMALL',
            MEDIUM: 'MEDIUM',
            LARGE: 'LARGE'
        };

        /**
         * @function services.MediaQueryService#getCurrentMediaQuery
         * @description Gets the current breakpoint type by reading the minWidth
         * @return {String} The current breakpoint, SMALL, MEDIUM or LARGE
         */
        function getCurrentMediaQuery() {
            if (window.matchMedia('(min-width: 0em)').matches && window.matchMedia('(max-width: 47.99em)').matches) {
                return breakPoints.SMALL;
            } else if (window.matchMedia('(min-width: 47.99em)').matches && window.matchMedia('(max-width: 79.99em)').matches) {
                return breakPoints.MEDIUM;
            } else if (window.matchMedia('(min-width: 79.99em)').matches) {
                return breakPoints.LARGE;
            }
        }

        return {
            getCurrentMediaQuery: getCurrentMediaQuery,
            breakPoints: breakPoints
        };
    }];

    app.service('mediaQueryService', mediaQueryService);
}());
