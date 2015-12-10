(function() {
    var app = angular.module('martinsWeb');

    var projectsController = ['$scope', '$log', '$http', 'mediaQueryService', 'config', function($scope, $log, $http, mediaQueryService, config) {
        $scope.projects;

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

        function clickOutsideHandler(e) {
            var container = $('#projectInfoInner');
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $('#projectInfo').fadeOut(300);
                $('#projectsMenu').animate({
                    opacity: '1.0'
                }, 300, function() {
                    $('#projectInfo div').html('');
                });
                $(document).unbind();
            }
        }

        $scope.projectsLinkClickHandler = function(id) {
            $('#projectInfo div').load('./includes/build/' + id + '.php', function() {
                $('#projectsMenu').animate({
                    opacity: '0.5'
                }, 300);
                $('#projectInfo').fadeIn(300);
                $('#backLink').click(backLinkClickHandler);
                $(document).mouseup(clickOutsideHandler);
            });
        }

        function backLinkClickHandler() {
            $('#projectInfo').fadeOut(300);
            $('#projectsMenu').animate({
                opacity: '1.0'
            }, 300, function() {
                $('#projectInfo div').html('');
            });
            $(document).unbind();
        }

        $scope.clearLeft = function(index) {
            if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.LARGE) {
                return (index % 4 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.MEDIUM) {
                return (index % 3 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.SMALL) {
                return (index % 2 === 0);
            }
        }

        function init() {
            $scope.projects = projects;
            $log.debug($scope.projects);

            $('#backLink').click(backLinkClickHandler);

            console.log(config);
        }

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        init();
    }];

    app.controller('projectsController', projectsController);
}());