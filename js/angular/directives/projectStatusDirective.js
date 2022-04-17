/**
 * @constructor ProjectStatusDirective
 * @memberof    directives
 * @description Directive for generating a project status box
 */
 export default class ProjectStatusDirective {
    constructor() {
        this.restrict = 'A';
        this.templateUrl = 'includes/build/projectStatus.html';
        this.scope = {
            list: '&list'
        };
    }

    link(scope, elem, attr) {
        scope.controller = {
            loading: false,
            usedDependencies: scope.list(),
            getClassForDep: function(dep) {
                switch (dep) {
                case 'angular':
                    return 'icon-angular';
                case 'gulp':
                    return 'icon-gulp';
                case 'bootstrap':
                    return 'icon-bootstrap';
                case 'grunt':
                    return 'icon-grunt';
                case 'jquery':
                    return 'icon-jquery';
                case 'react':
                    return 'icon-react';
                case 'npm':
                    return 'icon-npm';
                case 'git':
                    return 'icon-git';
                case 'javascript':
                    return 'icon-javascript-alt';
                case 'java':
                    return 'icon-java-bold';
                /* case 'csharp':
                    return 'icon-csharp'; */
                case 'css':
                    return 'icon-css3-alt';
                case 'html':
                    return 'icon-html5-alt';
                case 'sass':
                    return 'icon-sass';
                case 'shell':
                    return 'icon-shell';
                case 'python':
                    return 'icon-python';
                case 'php':
                    return 'icon-php';
                case 'svg':
                    return 'icon-svg';
                case 'less':
                    return 'fab fa-less';
                }
            }
        };
    }
}
