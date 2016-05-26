(function() {
    var app = angular.module("martinsWeb");

    /**
     * @constructor CvController
     * @memberof controllers
     * @description Controller for cv section
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     */
    var cvController = ['$scope', '$log', '$http', function($scope, $log, $http) {

        // Public variables
        $scope.techCompetence = {};

        /**
         * @function controllers.CvController#readMoreLinkClickHandler
         * @description Function for the event when clicking a "read more" label
         */
        function readMoreLinkClickHandler() {
            var id = $(this).attr("for");

            $(".showMoreBox").each(function() {
                if ($(this).attr("id") === id) {
                    if ($(this).css("display") !== "none") {
                        $(this).slideUp(300);
                    } else {
                        $(this).slideDown(300);
                    }
                } else {
                    $(this).slideUp(300);
                }
            });
        }

        /**
         * @function controllers.CvController#init
         * @description Initilization function
         */
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