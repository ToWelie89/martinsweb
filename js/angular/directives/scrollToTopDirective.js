(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor ScrollToTopDirective
     * @memberof    directives
     * @description Directive for generating a "go to top" element
     */
    var scrollToTopDirective = function() {
        return {
            restrict: 'A',
            template: '<p class="fakeLink" data-ng-click="goToTop()"><i class="fa fa-angle-up" aria-hidden="true"></i> Back to top <i class="fa fa-angle-up" aria-hidden="true"></i></p>',
            scope: true,
            link: function(scope, elem, attr) {
                scope.goToTop = function() {
                    document.getElementById('topBar').scrollIntoView();
                };
            }
        };
    };

    app.directive('scrollToTop', scrollToTopDirective);
}());
