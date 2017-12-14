/*
* IMPORTS
*/

import ArtController from './angular/controllers/artController';
import BlogController from './angular/controllers/blogController';
import BlogPostController from './angular/controllers/blogPostController';
import CvController from './angular/controllers/cvController';
import GyroSnakeEditorController from './angular/controllers/gyroSnakeEditorController';
import MainController from './angular/controllers/mainController';
import MenuController from './angular/controllers/menuController';
import ProjectsController from './angular/controllers/projectsController';
import StartController from './angular/controllers/startController';
import VideosController from './angular/controllers/videosController';

import GithubService from './angular/services/githubService';
import InstagramService from './angular/services/instagramService';
import PageUrlService from './angular/services/pageUrlService';
import WordpressService from './angular/services/wordpressService';

import ScrollToTopDirective from './angular/directives/scrollToTopDirective';

import {CapitalizeFirstLetter} from './angular/filters/capitalizeFirstLetter';
import {FormatCorrectNameForTech} from './angular/filters/formatCorrectNameForTech';

/*
* DECLARE ANGULAR CONTROLLERS, SERVICES, DIRECTIVES AND FILTERS
*/

const app = angular.module('martinsWeb', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
/* CONTROLLERS */
app.controller('artController', ArtController);
app.controller('blogController', BlogController);
app.controller('blogPostController', BlogPostController);
app.controller('cvController', CvController);
app.controller('gyroSnakeEditorController', GyroSnakeEditorController);
app.controller('mainController', MainController);
app.controller('menuController', MenuController);
app.controller('projectsController', ProjectsController);
app.controller('startController', StartController);
app.controller('videosController', VideosController);
/* SERVICES */
app.service('githubService', GithubService);
app.service('instagramService', InstagramService);
app.service('pageUrlService', PageUrlService);
app.service('wordpressService', WordpressService);
/* DIRECTIVES */
app.directive('scrollToTop', () => new ScrollToTopDirective());
/* FILTERS */
app.filter('capitalizeFirstLetter', CapitalizeFirstLetter);
app.filter('formatCorrectNameForTech', FormatCorrectNameForTech);

/*
* CONFIG
*/

app.constant('config', {
    useMocks: false
});
app.config(['$routeProvider', '$locationProvider', '$logProvider',
    function($routeProvider, $locationProvider, $logProvider) {
        $routeProvider
            .when('/', {
                controller: 'startController',
                templateUrl: 'views/build/index.html'
            })
            .when('/cv', {
                controller: 'cvController',
                controllerAs: 'controller',
                templateUrl: 'views/cv.html'
            })
            .when('/bio', {
                templateUrl: 'views/bio.php'
            })
            .when('/404', {
                templateUrl: 'views/404.html'
            })
            .when('/projects', {
                controller: 'projectsController',
                controllerAs: 'controller',
                templateUrl: 'views/build/projects.html'
            })
            .when('/projects/:projectName', {
                controller: 'projectsController',
                controllerAs: 'controller',
                templateUrl: 'views/build/projects.html'
            })
            .when('/gyroSnakeEditor', {
                controller: 'gyroSnakeEditorController',
                templateUrl: 'views/gyroSnakeEditor.html'
            })
            .when('/flappyDoge', {
                templateUrl: 'views/flappyDoge.html'
            })
            .when('/blog', {
                controller: 'blogController',
                controllerAs: 'controller',
                templateUrl: 'views/blog.html'
            })
            .when('/blog/:blogName', {
                controller: 'blogPostController',
                controllerAs: 'controller',
                templateUrl: 'views/blogPost.html'
            })
            .when('/art', {
                controller: 'artController',
                controllerAs: 'controller',
                templateUrl: 'views/build/art.php'
            })
            .when('/videos', {
                controller: 'videosController',
                templateUrl: 'views/build/videos.html'
            })
            .when('/photos', {
                templateUrl: 'views/photos.html'
            })
            .otherwise({
                templateUrl: 'views/404.html'
            });
        $logProvider.debugEnabled(true);
    }
]);
