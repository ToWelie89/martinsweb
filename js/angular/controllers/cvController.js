(function() {
    var app = angular.module('martinsWeb');

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
         * @function controllers.CvController#init
         * @description Initilization function
         */
        function init() {
            $http.get('json/techCompetence.json').success(function(data) {
                $scope.techCompetence = data;
                $log.debug($scope.techCompetence);
            });
        }

        init();
    }];

    app.controller('cvController', cvController);
}());
