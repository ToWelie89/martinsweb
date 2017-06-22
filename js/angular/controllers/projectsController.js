(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ProjectsController
     * @memberof controllers
     * @description Controller for the projects page
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$log}
     * @param {$timeout} $timeout - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$timeout}
     * @param {$routeParams} $routeParams - See {@link https://code.angularjs.org/1.3.15/docs/api/ngRoute/service/$routeParams}
     * @param {$location} $location - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$location}
     * @param {$window} $window - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$timeout}
     */
    var projectsController = ['$scope', '$log', '$timeout', '$routeParams', '$location', '$window', 'githubService', function($scope, $log, $timeout, $routeParams, $location, $window, githubService) {

        $scope.openProject = openProject;
        $scope.closeProject = closeProject;

        var gitHubRepoNames = {
            risk: 'ECMA6Risk',
            starapp: 'StarApp',
            portfolio: 'martinsweb',
            snake: 'GyroSnake',
            instaanalytics: 'InstagramAnalytics',
            wcc: 'WorldCup2014Simulator',
            wh40k: 'Warhammer-40k-Unit-Simulator',
            flappyDoge: 'FlappyDoge'
        };
        var gitHubUserName = 'ToWelie89';
        var db = {};
        var dependenciesToLookFor = {};

        /**
         * @function controllers.ProjectsController#init
         * @description Initlization function
         */
        function init() {
            $log.debug($scope.projects);

            reset();
            setEvents();

            $timeout(function() {
                setEvents();
                if ($routeParams.projectName) {
                    initProject($routeParams.projectName);
                }
            }, 100);
        }

        function initProject(project) {
            $('#' + project + 'Modal').modal('toggle');
            var url = 'https://api.github.com/repos/' + gitHubUserName + '/' + gitHubRepoNames[project] + '/contents';
            githubService.getGithubApiResponseByURL(url)
                .then(function(response) {
                    $log.debug(response);
                });
        }

        function setEvents() {
            $('.modal').each(function() {
                $(this).on('hidden.bs.modal', function (e) {
                    $window.location.assign('/#projects');
                });
            });
        }

        function reset() {
            db = {
                js: 0,
                html: 0,
                php: 0,
                css: 0,
                less: 0,
                ts: 0,
                xml: 0,
                json: 0
            };
            dependenciesToLookFor = {
                grunt: false,
                angular: false,
                webpack: false,
                babel: false,
                karma: false
            };
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
