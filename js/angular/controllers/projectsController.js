/*
    IMPORTS
*/

import {getColorAsHex} from './../../helpers/colorGenerator';
import {removeDuplicates} from './../../helpers/helpers';

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

        this.vm.loading = false;

        this.vm.openProject = this.openProject;
        this.vm.closeProject = this.closeProject;
        this.vm.selectTab = this.selectTab;
        this.vm.getClassForDep = this.getClassForDep;

        this.initTabs();
        this.gitHubRepoNames = {
            risk: 'TotalRisk',
            starapp: 'StarApp',
            portfolio: 'martinsweb',
            snake: 'GyroSnake',
            instaanalytics: 'InstagramAnalytics',
            wcc: 'EuroCup2021Simulator',
            wh40k: 'Warhammer-40k-Unit-Simulator',
            flappyDoge: 'FlappyDoge',
            stockAnalyzer: 'StockAnalyzer',
        };
        this.hardcodedProjectDependencies = {
            snake: ['java', 'android', 'git', 'mysql'],
            borghild: ['javascript', 'nodejs', 'machinelearning', 'tesseract', 'tensorflow', 'opencv', 'customvision'],
            portfolio: ['git', 'npm', 'grunt', 'angular', 'babel', 'karma', 'jquery', 'bootstrap'],
            risk: ['git', 'npm', 'grunt', 'angular', 'babel', 'jquery', 'bootstrap', 'electron', 'heroku', 'firebase', 'socket.io', 'nodejs'],
            valbarometern: ['git', 'npm', 'grunt', 'html', 'css', 'javascript', 'mysql', 'firebase'],
            sti: ['html', 'css', 'php', 'javascript', 'mysql', 'jquery'],
            stockAnalyzer: ['html'],
            boxByDoris: ['html', 'css'],
            exjobb: ['dotnet', 'csharp', 'visualstudio', 'wireshark'],
            mkp: ['java', 'html', 'css', 'android', 'svn'],
            wcc: ['git', 'npm', 'grunt', 'html', 'css', 'javascript'],
            flickrEditor: ['javascript', 'html', 'css'],
            gbgmuaythai: ['javascript', 'hexo', 'html', 'css', 'graphql', 'express', 'mysql']
        };
        this.gitHubUserName = 'ToWelie89';
        this.dependenciesToLookForInPackage = [
            'grunt',
            'angular',
            'webpack',
            'babel',
            'karma',
            'react',
            'jquery',
            'bootstrap',
            'electron',
            'heroku',
            'firebase',
            'socket.io',
            'nodejs'
        ];

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
            cs: 0,
            java: 0,
            svg: 0
        };
        this.vm.usedDependencies = [];
        this.currentOpenProject = '';
    }

    /**
     * @function controllers.MenuController#initProject
     * @param {Obj} project The project to initialize
     * @description Function for initializing a chosen project which includes gathering data of the project repo
     */
    initProject(project) {
        this.vm.loading = true;
        this.reset();
        this.currentOpenProject = project;
        $('#' + this.currentOpenProject + 'Modal').modal('toggle');

        $('.carousel-control.left').click(function() {
            $('.projectCarousel').carousel('prev');
        });
        $('.carousel-control.right').click(function() {
            $('.projectCarousel').carousel('next');
        });

        $('.carousel-indicators li').on('click', function() {
            $('.projectCarousel').carousel($(this).index());
        });

        const localStorageData = JSON.parse(localStorage.getItem(`${this.currentOpenProject}StorageData`));

        if (localStorageData && !this.localStorageDataIsOlderThanOneDay(localStorageData)) {
            this.db = localStorageData.db;
            this.vm.usedDependencies = localStorageData.usedDependencies;
            this.vm.usedDependencies = removeDuplicates(this.vm.usedDependencies);
            this.initializeStatistics();
            this.vm.loading = false;
        } else {
            this.getDataForRepoFromGithub();
        }
    }

    localStorageDataIsOlderThanOneDay(localStorageData) {
        const timeStamp = localStorageData.timeStamp;
        const diff = Date.now() - timeStamp;
        return (diff > (1000 * 60 * 60 * 24));
    }

    getDataForRepoFromGithub() {
        if (this.hardcodedProjectDependencies[this.currentOpenProject]) {
            this.vm.usedDependencies = this.hardcodedProjectDependencies[this.currentOpenProject];

            this.vm.loading = false;
        } else if (this.gitHubRepoNames[this.currentOpenProject]) {
            var url = 'https://api.github.com/repos/' + this.gitHubUserName + '/' + this.gitHubRepoNames[this.currentOpenProject] + '/contents';
            this.githubService.getGithubApiResponseByURL(url)
            .then(response => {
                console.log(response.data);
                this.depth = 0;
                // If one of these files exists in root folder then we can assume project is versioned with Git
                if (response.data.find(f => f.name === '.gitignore' || f.name === '.gitAttributes' || f.name === '.gitModules')) {
                    this.vm.usedDependencies.push('git');
                }
                this.getDependenciesFromPackage(response);
                this.handleContents(response.data);
            });
        }
    }

    /**
     * @function controllers.MenuController#getDependenciesFromPackage
     * @param {String} response The response
     * @description Function for determining which dependencies are used for the project
     */
    getDependenciesFromPackage(response) {
        const packageJson = response.data.find(f => f.name === 'package.json');
        if (packageJson) {
            // Package.json exists, therefore project uses npm
            this.vm.usedDependencies.push('npm');
            this.githubService.getGithubApiResponseByURL(packageJson.download_url)
            .then(resp => {
                const dependencies = Object.keys(resp.data.devDependencies ? resp.data.devDependencies : {})
                                     .concat(Object.keys(resp.data.dependencies ? resp.data.dependencies : {}));

                this.dependenciesToLookForInPackage.forEach(d => {
                    let foundDep = dependencies.find(dep => {
                        return dep.includes(d);
                    });

                    if (!foundDep) {
                        foundDep = resp.data.keywords.find(keyword => {
                            return keyword.includes(d);
                        });
                    }

                    if (foundDep) {
                        this.vm.usedDependencies.push(d);
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
            'packages',
            'fonts'
        ];

        return (folderBlackList.includes(dirName) || dirName.includes('ReSharper_'));
    }

    fileIsBlacklisted(fileName) {
        const fileBlackList = [
            'package-lock.json',
            'package.json'
        ];

        return (fileBlackList.includes(fileName));
    }

    /**
     * @function controllers.MenuController#handleContents
     * @param {Obj} data The content data to process
     * @description Recursive function used to traverse all folders of a repo and get the contents and build up the stats used for graphs
     */
    handleContents(data) {
        data.forEach(d => {
            if (d.type === 'file' && !this.fileIsBlacklisted(d.name)) {
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

            if (this.newDb['js']) { this.vm.usedDependencies.push('javascript'); }
            if (this.newDb['java']) { this.vm.usedDependencies.push('java'); }
            if (this.newDb['cs']) { this.vm.usedDependencies.push('csharp'); }
            if (this.newDb['css']) { this.vm.usedDependencies.push('css'); }
            if (this.newDb['html']) { this.vm.usedDependencies.push('html'); }
            if (this.newDb['scss']) { this.vm.usedDependencies.push('sass'); }
            if (this.newDb['less']) { this.vm.usedDependencies.push('less'); } // Missing icon
            if (this.newDb['sh']) { this.vm.usedDependencies.push('shell'); }
            if (this.newDb['py']) { this.vm.usedDependencies.push('python'); }
            if (this.newDb['php']) { this.vm.usedDependencies.push('php'); }
            if (this.newDb['svg']) { this.vm.usedDependencies.push('svg'); }

            this.vm.usedDependencies = removeDuplicates(this.vm.usedDependencies);

            const data = {
                db: this.newDb,
                usedDependencies: this.vm.usedDependencies,
                timeStamp: Date.now()
            }

            localStorage.setItem(`${this.currentOpenProject}StorageData`, JSON.stringify(data));

            this.vm.loading = false;
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
        console.log(this.vm.usedDependencies);

        // Convert to array of objects
        this.vm.dbArray = Object.keys(this.newDb).map(x => {
            return {
                key: x,
                value: this.newDb[x]
            };
        });
        // Sort to show most frequent first
        this.vm.dbArray.sort((a, b) => {
            return b.value - a.value;
        });
        // Fix to account for rounding errors where total % would sometime be 99% or 101%
        const totalPercentageSum = this.vm.dbArray.map(x => x.value).reduce((a, b) => a + b, 0);
        if (totalPercentageSum !== 100 && this.vm.dbArray[0]) {
            this.vm.dbArray[0].value += (100 - totalPercentageSum);
        }
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
        this.initTabs();
        this.$location.path('projects/' + projectName);
    }

    initTabs() {
        this.tabs = {
            valbarometern: {
                selected: 'screenshots'
            },
            risk: {
                selected: 'screenshots'
            },
            borghild: {
                selected: 'screenshots'
            },
            snake: {
                selected: 'gamedemo'
            },
            sti: {
                selected: 'screenshots'
            },
            stockAnalyzer: {
                selected: 'screenshots'
            },
        };
    }

    selectTab(tabName, projectName) {
        if (!this.tabs[projectName]) {
            this.tabs[projectName] = {
                selected: tabName
            }
        } else {
            this.tabs[projectName].selected = tabName;
        }
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

    getClassForDep(dep) {
        switch (dep) {
        case 'angular':
            return 'icon-angular';
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