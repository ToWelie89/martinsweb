/**
 * @constructor CvController
 * @memberof controllers
 * @description Controller for cv section
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 */
export default class CvController {
    /**
     * @function controllers.CvController#constructor
     * @description Initilization function
     */
    constructor($scope, $log) {
        this.vm = this;
        this.vm.techCompetence = {};

        this.$log = $log;

        fetch('json/techCompetence.json')
        .then(resp => resp.json())
        .then(data => {
            this.vm.techCompetence = data;
            this.$log.debug(this.vm.techCompetence);
        });
    }
}
