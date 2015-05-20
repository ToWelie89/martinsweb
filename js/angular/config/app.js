(function() {
	var app = angular.module('martinsWeb', ['ngRoute']);

	app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
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
					controller: 'bioController',
					templateUrl: 'views/bio.php'
				})
				.when('/404', {
					templateUrl: 'views/404.html'
				})
				.when('/projects', {
					controller: 'projectsController',
					templateUrl: 'views/projects.html'
				})
				.when('/gyroSnakeEditor', {
					controller: 'gyroSnakeEditorController',
					templateUrl: 'views/gyroSnakeEditor.html'
				})
				.otherwise({
					templateUrl: 'views/404.html'
				});
		}
	]);
}());