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
            'description': 'A Starcraft 2 app for Windows 8/RT',
            'highlightProject': false
        }, {
            'id': 'portfolio',
            'img': '../../assets/build/portfolio.png',
            'name': 'Portfolio',
            'description': 'My portfolio and personal website',
            'highlightProject': true
        }, {
            'id': 'sti',
            'img': '../../assets/build/sti.png',
            'name': 'STI-Starcraft',
            'description': 'A Starcraft 2 community',
            'highlightProject': false
        }, {
            'id': 'instaanalytics',
            'img': '../../assets/build/instaanalytics.png',
            'name': 'Instagram Analyzer',
            'description': 'An app used for analyzing an Instagram account',
            'highlightProject': false
        }, {
            'id': 'exjobb',
            'img': '../../assets/build/exjobb.png',
            'name': 'Bachelors thesis',
            'description': 'My Bachelors Thesis from my time at Chalmers',
            'highlightProject': true
        }, {
            'id': 'wcc',
            'img': '../../assets/build/wcc.png',
            'name': 'World Cup Calculator',
            'description': 'A calculator used to simulate potential World cup 2014 results',
            'highlightProject': false
        }, {
            'id': 'snake',
            'img': '../../assets/build/snake.png',
            'name': 'GyroSnake',
            'description': 'A Snake game for Android devices',
            'highlightProject': true
        }, {
            'id': 'boxByDoris',
            'img': '../../assets/build/boxByDoris.png',
            'name': 'Box By Doris',
            'description': 'A simple image editor based on Flickrs API',
            'highlightProject': false
        }, {
            'id': 'mkp',
            'img': '../../assets/build/mkp.png',
            'name': 'Mobile Keyring',
            'description': 'A technology used for generating temporary passwords',
            'highlightProject': false
        }, {
            'id': 'arduinorobot',
            'img': '../../assets/build/arduinoRobot.png',
            'name': 'Arduino Robot',
            'description': 'A robot built with the Arduino microcontroller unit',
            'highlightProject': true
        }, {
            'id': 'wh40k',
            'img': '../../assets/build/wh40k.png',
            'name': 'WH40k Simulator',
            'description': 'A game engine based on the popular boardgame Warhammer 40k',
            'highlightProject': false
        }, {
            'id': 'flappyDoge',
            'img': '../../assets/build/flappyDoge.png',
            'name': 'FlappyDoge',
            'description': 'My version of the popular game Flappy Bird',
            'highlightProject': false
        }, {
            'id': 'flickrEditor',
            'img': '../../assets/build/flickrEditor.png',
            'name': 'Flickr Editor',
            'description': 'A simple image editor based on Flickrs API',
            'highlightProject': false
        }];

        /**
         * @function controllers.ProjectsController#init
         * @description Initlization function
         */
        function init() {
            $scope.projects = projects;
            //shuffle($scope.projects);
            $log.debug($scope.projects);

            console.log(config);

            setTimeout(function() {
                $('.grid').masonry({
                    itemSelector: '.grid-item'
                });

                $('.grid-item a').hover(function() {
                    $('.grid-item a').not(this).find('img').stop(false, false);
                    $('.grid-item a').not(this).find('img').fadeTo(400, 0.2);
                }, function() {
                    $('.grid-item a').not(this).find('img').stop(false, false);
                    $('.grid-item a').not(this).find('img').fadeTo(400, 1);
                });
            }, 300);


        }

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        init();
    }];

    app.controller('projectsController', projectsController);
}());