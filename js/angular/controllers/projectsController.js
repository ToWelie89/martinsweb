(function() {
    var app = angular.module('martinsWeb');

    var projectsController = ['$scope', '$log', '$http', 'mediaQueryService', 'config', function($scope, $log, $http, mediaQueryService, config) {
        $scope.projects;

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
            $('#projectInfo div').load('./includes/projects/' + id + '.php', function() {
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
            if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.LARGE){
                return (index % 4 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.MEDIUM) {
                return (index % 3 === 0);
            } else if (mediaQueryService.getCurrentMediaQuery() === mediaQueryService.breakPoints.SMALL) {
                return (index % 2 === 0);
            }
        }

        function init() {
            $http.get('json/projects.json').success(function(data) {
                //shuffle(data);
                $scope.projects = data;
                $log.debug($scope.projects);
            });

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