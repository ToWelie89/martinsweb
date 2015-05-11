/*'use strict';

var app = angular.module("martinsWeb", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
		.when('/projects', {
			controller: 'projectsController'
		})
		.otherwise({
			redirectTo: "/"
		});
});*/

(function() {
	var app = angular.module("martinsWeb", ["ngRoute"]);
	app.config(function($routeProvider) {
		$routeProvider
			.when('/projects', {
				controller: 'projectsController'
			})
			.otherwise({
				controller: 'projectsController'
			});
	});
}());