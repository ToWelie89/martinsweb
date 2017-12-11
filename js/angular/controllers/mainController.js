/**
 * @constructor MainController
 * @memberof controllers
 * @description Main controller for the whole site
 */
export default class MainController {
    constructor($scope) {
        this.vm = this;

        $scope.$on('$routeChangeStart', function(next, current) {
            console.log('Route changed');
        });

        fetch('./package.json')
        .then((resp) => resp.json())
        .then((data) => {
            this.vm.version = data.version;
            $scope.$apply();
        });
    }
}
