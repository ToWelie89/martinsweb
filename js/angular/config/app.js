(function() {
    var app = angular.module('martinsWeb', ['ngRoute', 'ngSanitize']);

    app.constant('config', {
        useMocks: false
    });

    app.config(['$routeProvider', '$locationProvider', '$logProvider',
        function($routeProvider, $locationProvider, $logProvider) {
            $routeProvider
                .when('/', {
                    controller: 'startController',
                    templateUrl: 'views/index.html'
                })
                .when('/projects', {
                    controller: 'projectsController',
                    templateUrl: 'views/projects.html'
                })
                .when('/cv', {
                    controller: 'cvController',
                    templateUrl: 'views/cv.html'
                })
                .when('/bio', {
                    templateUrl: 'views/build/bio.php'
                })
                .when('/404', {
                    templateUrl: 'views/404.html'
                })
                .when('/projects', {
                    controller: 'projectsController',
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
                    templateUrl: 'views/blog.html'
                })
                .when('/blogPost', {
                    controller: 'blogPostController',
                    templateUrl: 'views/blogPost.html'
                })
                .when('/art', {
                    controller: 'artController',
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
}());
