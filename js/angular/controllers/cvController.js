/*
    IMPORTS
*/

import {TECH_COMPETENCE} from './../../configFiles/techCompetence';

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
        this.vm.loading = false;
        this.vm.usedDependencies = [];
        this.vm.dependencies = {
            knowit: ['html', 'css', 'freemarker', 'less', 'javascript', 'requirejs', 'angular', 'jquery', 'karma', 'grunt', 'redux', 'java', 'maven', 'jenkins', 'sonarqube', 'confluence', 'jira', 'ubuntu', 'git', 'mercurial', 'magnolia'],
            wirelessCar: ['html', 'css', 'less', 'javascript', 'angular', 'vue', 'jest', 'cypress', 'grunt', 'redux', 'java', 'maven', 'jenkins', 'sonarqube', 'confluence', 'jira', 'git', 'gerrit'],
            barium: ['html', 'css', 'less', 'javascript', 'typescript', 'azuredevops'],
            recordedFuture: ['html', 'css', 'less', 'javascript', 'jest', 'gulp', 'jenkins', 'sonarqube', 'confluence', 'jira', 'git'],
            cochlear: ['csharp', 'dotnet', 'visualstudio', 'jira']
        };

        // Javascript, requrie, Angular, Grunt, jQuery, Sonar, Confluence, Karma, Java, Maven, Karaf, Jenkins, CSS3, HTML5, Jira, Ubuntu, Git, Mercurial

        this.$log = $log;

        this.vm.techCompetence = TECH_COMPETENCE;
        this.vm.getClassForDep = this.getClassForDep;
        this.$log.debug(this.vm.techCompetence);
    }

    getClassForDep(dep) {
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
}
