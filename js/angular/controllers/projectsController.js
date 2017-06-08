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
    var projectsController = ['$scope', '$log', '$http', 'config', '$timeout', '$routeParams', '$location', '$window', function($scope, $log, $http, config, $timeout, $routeParams, $location, $window) {

        $scope.openProject = openProject;
        $scope.closeProject = closeProject;

        /**
         * @function controllers.ProjectsController#init
         * @description Initlization function
         */
        function init() {
            $log.debug($scope.projects);

            setTimeout(function() {
                $('.modal').each(function() {
                    $(this).on('hidden.bs.modal', function (e) {
                        $window.location.assign('/#projects');
                    });
                })
                if ($routeParams.projectName) {
                    $('#' + $routeParams.projectName + 'Modal').modal('toggle');
                }
            }, 100);
        }

        /**
         * @function controllers.ProjectsController#openProject
         * @param {String} The project name
         * @description Opens a modal for the project
         */
        function openProject(projectName) {
            $location.path('projects/' + projectName);
        }

        /**
         * @function controllers.ProjectsController#closeProject
         * @param {String} The project name
         * @description Closes a modal for the project
         */
        function closeProject(projectName) {
            $('#' + projectName + 'Modal').modal('toggle');
            $('.modal-backdrop').css('opacity', 0);
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            $location.path('projects/');
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
