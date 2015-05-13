(function() {
    var app = angular.module("martinsWeb");

    var projectsController = function($scope, $log, $http) {
        $scope.projects;

        function clickOutsideHandler(e) {
            var container = $("#projectInfoInner");
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $("#projectInfo").fadeOut(300);
                $("#projectsMenu").animate({
                    opacity: "1.0"
                }, 300, function() {
                    $("#projectInfo div").html("");
                });
                $(document).unbind();
            }
        }

        $scope.projectsLinkClickHandler = function(id) {
            $("#projectInfo div").load("/includes/projects/" + id + ".php", function() {
                $("#projectsMenu").animate({
                    opacity: "0.5"
                }, 300);
                $("#projectInfo").fadeIn(300);
                $("#backLink").click(backLinkClickHandler);
                $(document).mouseup(clickOutsideHandler);
            });
        }

        function backLinkClickHandler() {
            $("#projectInfo").fadeOut(300);
            $("#projectsMenu").animate({
                opacity: "1.0"
            }, 300, function() {
                $("#projectInfo div").html("");
            });
            $(document).unbind();
        }

        function setSizes() {

            if ($scope.projects.length % 5 === 0)
            {
                return;
            } else {
                var numberOfProjectsOnLastRow = $scope.projects.length % 5;
                var numberOfProjectsToShowLarge = 5 - numberOfProjectsOnLastRow;
                var numberOfRows = Math.ceil($scope.projects.length / 5);

                angular.forEach($scope.projects, function(project){
                    project.showLarge = (false);
                });

                for (var i = 0; i < $scope.projects.length; i++)
                {
                    if ((i + 1) % numberOfProjectsToShowLarge === 0)
                    {
                        $scope.projects[i].showLarge = true;
                    }
                }

                /*for (var i = 0; i < numberOfRows; i++)
                {
                    var randomIndex = Math.floor((Math.random() * (4 * (i + 1))) + (i * 5));
                    $scope.projects[randomIndex].showLarge = true;
                }*/
            }
        }

        function init() {
            $http.get('json/projects.json').success(function(data) {
                //shuffle(data);
                $scope.projects = data;
                setSizes();
                $log.debug($scope.projects);
            });

            $("#backLink").click(backLinkClickHandler);
        }

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        init();
    };

    app.controller("projectsController", projectsController);
}());