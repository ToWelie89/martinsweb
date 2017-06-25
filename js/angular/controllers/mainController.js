/**
 * @constructor MainController
 * @memberof controllers
 * @description Main controller for the whole site
 */
export default class MainController {
    constructor($scope) {
        $scope.$on('$routeChangeStart', function(next, current) {
            console.log('Route changed');
        });
    }
}
