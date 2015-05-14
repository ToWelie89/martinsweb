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

                while (numberOfProjectsToShowLarge > 0)
                {
                    var randomIndex = Math.floor((Math.random() * $scope.projects.length) + 0);
                    $scope.projects[randomIndex].showLarge = true;
                    numberOfProjectsToShowLarge--;
                }
                //fixRowProblems();
            }
        }

        function fixRowProblems(){
            var minIndex = 0;
            var maxIndex = 4;
            var currentRowSize = 0;
            for (var i = 0; i < $scope.projects.length; i++)
            {
                if (getTotalSize() % 5 !== 0)
                {
                    if ($scope.projects[i].showLarge)
                    {
                        currentRowSize += 2;
                    } else {
                        currentRowSize++;
                    }

                    if (currentRowSize === 0)
                    {
                        minIndex = i;
                    }
                    if (currentRowSize === 5)
                    {
                        maxIndex = i;
                        currentRowSize = 0;
                    }

                    if (currentRowSize === 4 && $scope.projects[i+1] && $scope.projects[i+1].showLarge){
                        var randomIndex = Math.floor((Math.random() * maxIndex) + minIndex);
                        $scope.projects[randomIndex].showLarge = true;
                    } else if (currentRowSize === 4 && !$scope.projects[i+1]){
                        var randomIndex = Math.floor((Math.random() * i) + minIndex);
                        $scope.projects[randomIndex].showLarge = true;
                    }
                }
            }
        }

        function getTotalSize(){
            var totalRowSize = 0;
            for (var i = 0; i < $scope.projects.length; i++)
            {
                if ($scope.projects[i].showLarge)
                {
                    totalRowSize += 2;
                } else {
                    totalRowSize++;
                }
            }
            return totalRowSize;
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