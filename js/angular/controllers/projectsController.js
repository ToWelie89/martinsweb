(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ProjectsController
     * @memberof controllers
     * @description Controller for the projects page
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     * @param {services.MediaQueryService} mediaQueryService - Service handling media query breakpoints
     * @param {config} config - Global configuration
     */
    var projectsController = ['$scope', '$log', '$http', 'mediaQueryService', 'config', function($scope, $log, $http, mediaQueryService, config) {

        // Public variables
        $scope.projects = [];

        // Private variables
        var projects = [{
            'id': 'starapp',
            'img': '../../assets/build/starapp.png',
            'name': 'Star Manager',
            'description': 'A Starcraft 2 app for Windows 8/RT'
        }, {
            'id': 'portfolio',
            'img': '../../assets/build/portfolio.png',
            'name': 'Portfolio',
            'description': 'My portfolio and personal website'
        }, {
            'id': 'sti',
            'img': '../../assets/build/sti.png',
            'name': 'sti-starcraft',
            'description': 'A Starcraft 2 community'
        }, {
            'id': 'exjobb',
            'img': '../../assets/build/exjobb.png',
            'name': 'Bachelors thesis',
            'description': 'My Bachelors Thesis from my time at Chalmers'
        }, {
            'id': 'instaanalytics',
            'img': '../../assets/build/instaanalytics.png',
            'name': 'Instagram Analyzer',
            'description': 'An app used for analyzing an Instagram account'
        }, {
            'id': 'wcc',
            'img': '../../assets/build/wcc.png',
            'name': 'World Cup Calculator',
            'description': 'A calculator used to simulate potential World cup 2014 results'
        }, {
            'id': 'snake',
            'img': '../../assets/build/snake.png',
            'name': 'GyroSnake',
            'description': 'A Snake game for Android devices'
        }, {
            'id': 'flappyDoge',
            'img': '../../assets/build/flappyDoge.png',
            'name': 'FlappyDoge',
            'description': 'My version of the popular game Flappy Bird'
        }, {
            'id': 'mkp',
            'img': '../../assets/build/mkp.png',
            'name': 'Mobile Keyring',
            'description': 'A technology used for generating temporary passwords'
        }, {
            'id': 'arduinorobot',
            'img': '../../assets/build/arduinoRobot.png',
            'name': 'Arduino Robot',
            'description': 'A robot built with the Arduino microcontroller unit'
        }, {
            'id': 'wh40k',
            'img': '../../assets/build/wh40k.png',
            'name': 'Warhammer 40k Simulator',
            'description': 'A game engine based on the popular boardgame Warhammer 40k'
        }, {
            'id': 'flickrEditor',
            'img': '../../assets/build/flickrEditor.png',
            'name': 'Flickr Editor',
            'description': 'A simple image editor based on Flickrs API'
        }];

        // Public functions
        $scope.projectsLinkClickHandler = projectsLinkClickHandler;
        $scope.clearLeft = clearLeft;

        /**
         * @function controllers.ProjectsController#clickOutsideHandler
         * @description Function for the event when user clicks outside of a the modal element
         * @param {Obj} e The element
         */
        function clickOutsideHandler(e) {
            var container = $('#projectInfoInner');
            // if the target of the click isn't the container... nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('#projectInfo').fadeOut(300);
                $('#projectsMenu').animate({
                    opacity: '1.0'
                }, 300, function() {
                    $('#projectInfo div').html('');
                });
                $(document).unbind();
            }
        }

        /**
         * @function controllers.ProjectsController#projectsLinkClickHandler
         * @description Function for the event when user clicks a project thumbnail, opens up project modal and loads data
         * @param {string} id The id of the project
         */
        function projectsLinkClickHandler(id) {
            $('#projectInfo div').load('./includes/build/' + id + '.php', function() {
                $('#projectsMenu').animate({
                    opacity: '0.5'
                }, 300);
                $('#projectInfo').fadeIn(300);
                $('#backLink').click(backLinkClickHandler);
                $(document).mouseup(clickOutsideHandler);
            });
        };

        /**
         * @function controllers.ProjectsController#backLinkClickHandler
         * @description Function for the event when user clicks the back button, closes modal
         */
        function backLinkClickHandler() {
            $('#projectInfo').fadeOut(300);
            $('#projectsMenu').animate({
                opacity: '1.0'
            }, 300, function() {
                $('#projectInfo div').html('');
            });
            $(document).unbind();
        }

        /**
         * @function controllers.ProjectsController#clearLeft
         * @description Function for returning a clear-left css value depending on current index
         * @param {number} id The index of the object
         * @returns {boolean} Returns true or false depending on the index
         */
        function clearLeft(index) {
            if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.LARGE) {
                return (index % 4 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.MEDIUM) {
                return (index % 3 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.SMALL) {
                return (index % 2 === 0);
            }
        };

        /**
         * @function controllers.ProjectsController#init
         * @description Initlization function
         */
        function init() {
            $scope.projects = projects;
            $log.debug($scope.projects);

            $('#backLink').click(backLinkClickHandler);

            console.log(config);
        }

        /*function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }*/

        init();
    }];

    app.controller('projectsController', projectsController);
}());