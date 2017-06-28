/*
    IMPORTS
*/

import {getColorAsHex} from './../../helpers/colorGenerator';

/**
 * @constructor ProjectsController
 * @memberof controllers
 * @description Controller for the projects page
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$log}
 * @param {$timeout} $timeout - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$timeout}
 * @param {$routeParams} $routeParams - See {@link https://code.angularjs.org/1.3.15/docs/api/ngRoute/service/$routeParams}
 * @param {$location} $location - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$location}
 * @param {$window} $window - See {@link https://code.angularjs.org/1.3.15/docs/api/ng/service/$timeout}
 * @param {services.GithubService} githubService - Service for fetch data from Github API
 */
export default class ProjectsController {
    constructor($scope, $log, $timeout, $routeParams, $location, $window, githubService) {
        this.vm = this;

        this.$log = $log;
        this.$timeout = $timeout;
        this.$routeParams = $routeParams;
        this.githubService = githubService;
        this.$window = $window;
        this.$location = $location;

        this.vm.openProject = this.openProject;
        this.vm.closeProject = this.closeProject;

        this.gitHubRepoNames = {
            risk: 'ECMA6Risk',
            starapp: 'StarApp',
            portfolio: 'martinsweb',
            snake: 'GyroSnake',
            instaanalytics: 'InstagramAnalytics',
            wcc: 'WorldCup2014Simulator',
            wh40k: 'Warhammer-40k-Unit-Simulator',
            flappyDoge: 'FlappyDoge'
        };
        this.gitHubUserName = 'ToWelie89';

        this.reset();
        this.setEvents();

        this.$timeout(() => {
            this.setEvents();
            if (this.$routeParams.projectName) {
                this.initProject(this.$routeParams.projectName);
            }
        }, 100);
    }

    /**
     * @function controllers.MenuController#reset
     * @description Reset data used for repository stats
     */
    reset() {
        this.db = {
            js: 0,
            html: 0,
            php: 0,
            css: 0,
            less: 0,
            ts: 0,
            xml: 0,
            json: 0,
            scss: 0,
            cs: 0
        };
        this.dependenciesToLookFor = {
            grunt: false,
            angular: false,
            webpack: false,
            babel: false,
            karma: false,
            react: false,
            jquery: false,
            bootstrap: false
        };
        this.currentOpenProject = '';
    }

    /**
     * @function controllers.MenuController#initProject
     * @param {Obj} project The project to initialize
     * @description Function for initializing a chosen project which includes gathering data of the project repo
     */
    initProject(project) {
        this.reset();
        this.currentOpenProject = project;
        $('#' + this.currentOpenProject + 'Modal').modal('toggle');

        const localStorageData = JSON.parse(localStorage.getItem(`${this.currentOpenProject}StorageData`));

        if (localStorageData && !this.localStorageDataIsOlderThanOneDay(localStorageData)) {
            this.db = localStorageData.db;
            this.dependenciesToLookFor = localStorageData.dependenciesToLookFor;
            this.initializeStatistics();
        } else {
            this.getDataForRepoFromGithub();
        }
    }

    localStorageDataIsOlderThanOneDay(localStorageData) {
        const timeStamp = localStorageData.timeStamp;
        return ((timeStamp * 1000 * 60 * 60 * 24) < Date.now());
    }

    getDataForRepoFromGithub() {
        if (this.gitHubRepoNames[this.currentOpenProject]) {
            var url = 'https://api.github.com/repos/' + this.gitHubUserName + '/' + this.gitHubRepoNames[this.currentOpenProject] + '/contents';
            this.githubService.getGithubApiResponseByURL(url)
            .then(response => {
                console.log(response.data);
                this.depth = 0;
                this.getDependencies(response);
                this.handleContents(response.data);
            });
        }
    }

    /**
     * @function controllers.MenuController#getDependencies
     * @param {String} response The response
     * @description Function for determining which dependencies are used for the project
     */
    getDependencies(response) {
        const packageJson = response.data.find(f => f.name === 'package.json');
        if (packageJson) {
            this.githubService.getGithubApiResponseByURL(packageJson.download_url)
            .then(resp => {
                const dependencies = Object.keys(resp.data.devDependencies);
                Object.keys(this.dependenciesToLookFor).forEach(key => {
                    if (dependencies.find(dep => dep.includes(key))) {
                        this.dependenciesToLookFor[key] = true;
                    }
                });
            });
        }
    }

    /**
     * @function controllers.MenuController#folderIsBlacklisted
     * @param {String} dirName Name of the folder
     * @description Function for determining if the specified folder is in the blacklist of folders to ignore
     */
    folderIsBlacklisted(dirName) {
        const folderBlackList = [
            'cssLibs',
            'node_modules',
            'bower_components',
            'bin',
            'obj',
            'packages'
        ];

        return (folderBlackList.includes(dirName) || dirName.includes('ReSharper_'));
    }

    /**
     * @function controllers.MenuController#handleContents
     * @param {Obj} data The content data to process
     * @description Recursive function used to traverse all folders of a repo and get the contents and build up the stats used for graphs
     */
    handleContents(data) {
        data.forEach(d => {
            if (d.type === 'file') {
                var fileParts = d.name.split('.');
                var fileExtension = fileParts[fileParts.length - 1];
                if (this.db[fileExtension] !== undefined) {
                    this.db[fileExtension] = this.db[fileExtension] + d.size;
                }
            } else if (d.type === 'dir' && !this.folderIsBlacklisted(d.name)) {
                this.depth++;
                this.githubService.getGithubApiResponseByURL(d.url)
                    .then(resp => {
                        this.handleContents(resp.data);
                    });
            }
        });
        this.depth--;
        if (this.depth === 0) {
            // Recursion is done
            this.initializeStatistics();
            // Save data to localstorage
            const data = {
                db: this.newDb,
                dependenciesToLookFor: this.dependenciesToLookFor,
                timeStamp: Date.now()
            }

            localStorage.setItem(`${this.currentOpenProject}StorageData`, JSON.stringify(data));
        }
    }

    initializeStatistics() {
        const totalSizeSum = Object.values(this.db).reduce((a, b) => a + b, 0);
        this.newDb = {};
        Object.keys(this.db).forEach(key => {
            if (this.db[key] > 0) {
                this.newDb[key] = Math.round((this.db[key] / totalSizeSum) * 100);
            }
        });

        console.log(this.newDb);
        console.log(this.dependenciesToLookFor);

        this.vm.dbArray = Object.keys(this.newDb).map(x => {
            return {
                key: x,
                value: this.newDb[x]
            };
        });
        this.vm.dependenciesToShow = Object.keys(this.dependenciesToLookFor).filter(x => this.dependenciesToLookFor[x]);

        /*
        var div = document.getElementById(`${this.currentOpenProject}Chart`);
        if (div) {
            var ctx = chart.getContext('2d');
            var chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(this.newDb),
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        data: Object.values(this.newDb),
                    }]
                },
                options: {}
            });
        }*/
    }

    /**
     * @function controllers.MenuController#setEvents
     * @description Set listener for the hide event of the modals
     */
    setEvents() {
        $('.modal').each(function() {
            $(this).on('hide.bs.modal', e => {
                window.location.href = '/#/projects';
            });
        });
    }

    /**
     * @function controllers.ProjectsController#openProject
     * @param {String} The project name
     * @description Opens a modal for the project
     */
    openProject(projectName) {
        this.$location.path('projects/' + projectName);
    }

    /**
     * @function controllers.ProjectsController#closeProject
     * @param {String} The project name
     * @description Closes a modal for the project
     */
    closeProject(projectName) {
        $('#' + projectName + 'Modal').modal('toggle');
        $('.modal-backdrop').css('opacity', 0);
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        this.$location.path('projects/');
    }

    /**
     * @function controllers.ProjectsController#shuffle
     * @param {Array} The array to shuffle
     * @description Randomly shuffles an array
     */
    shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
}