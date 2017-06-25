/**
 * @constructor ScrollToTopDirective
 * @memberof    directives
 * @description Directive for generating a "go to top" element
 */
export default class ScrollToTopDirective {
    constructor() {
        this.restrict = 'A';
        this.template = '<p class="fakeLink" data-ng-click="goToTop()"><i class="fa fa-angle-up" aria-hidden="true"></i> Back to top <i class="fa fa-angle-up" aria-hidden="true"></i></p>';
        this.scope = {};
    }

    link(scope, elem, attr) {
        scope.goToTop = () => {
            document.getElementById('topBar').scrollIntoView();
        };
    }
}
