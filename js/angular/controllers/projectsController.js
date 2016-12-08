(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ProjectsController
     * @memberof controllers
     * @description Controller for the projects page
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     * @param {config} config - Global configuration
     * @param {$timeout} $timeout - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$timeout}
     */
    var projectsController = ['$scope', '$log', '$http', 'config', '$timeout', function($scope, $log, $http, config, $timeout) {

        /**
         * @function controllers.ProjectsController#init
         * @description Initlization function
         */
        function init() {
            $log.debug($scope.projects);
            console.log(config);
        }

        /**
         * @function controllers.ProjectsController#shuffle
         * @param {Array} The array to shuffle
         * @description Randomly shuffles an array
         */
        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        init();
    }];

    app.controller('projectsController', projectsController);
}());
