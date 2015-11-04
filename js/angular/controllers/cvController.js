(function() {
    var app = angular.module("martinsWeb");

    var cvController = ['$scope', '$log', '$http', function($scope, $log, $http) {

        $scope.techCompetence;

        function readMoreLinkClickHandler() {
            var id = $(this).attr("for");

            $(".showMoreBox").each(function() {
                if ($(this).attr("id") == id) {
                    if ($(this).css("display") != "none") {
                        $(this).slideUp(300);
                    } else {
                        $(this).slideDown(300);
                    }
                } else {
                    $(this).slideUp(300);
                }
            });
        }

        function init() {
            $(document).ready(function() {
                $(".readMoreLink").click(readMoreLinkClickHandler);
            });

            $http.get('json/techCompetence.json').success(function(data) {
                $scope.techCompetence = data;
                $log.debug($scope.techCompetence);
            });
        }

        init();
    }];

    app.controller("cvController", cvController);
}());