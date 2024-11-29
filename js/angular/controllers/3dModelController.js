/*
    IMPORTS
*/
import {MODELS} from './../../configFiles/3dmodels';

/**
 * @constructor threeDModelController
 * @memberof controllers
 * @description 
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 */
export default class ThreeDModelController {
    constructor($scope, $log, $location, $timeout, $routeParams) {
        this.vm = this;

        this.$location = $location;
        this.$timeout = $timeout;
        this.$routeParams = $routeParams;

        // Public variables
        this.vm.models = MODELS;
        this.vm.loading = false;
        this.currentOpenProject = undefined;
        this.vm.selectedTab = undefined;

        this.vm.openModel = this.openModel;
        this.vm.closeProject = this.closeProject;
        this.vm.selectTab = this.selectTab;

        this.$timeout(() => {
            this.setEvents();
            if (this.$routeParams.modelName) {
                this.initModel(this.$routeParams.modelName);
            }
        }, 100);
    }

    setEvents() {
        $('.modal').each(function() {
            $(this).on('hide.bs.modal', e => {
                window.location.href = '/#/3dmodels';
            });
        });
    }

    initModel(model) {
        //this.vm.loading = true;
        this.reset();
        $('#threeDModelModal').modal('toggle');

        $('.carousel-control.left').click(function() {
            $('.projectCarousel').carousel('prev');
        });
        $('.carousel-control.right').click(function() {
            $('.projectCarousel').carousel('next');
        });

        $('.carousel-indicators li').on('click', function() {
            $('.projectCarousel').carousel($(this).index());
        });

        this.loadModel(model);
    }

    selectTab(tabName) {
        if (tabName === this.vm.selectedTab.name) return;
        
        this.vm.selectedTab = this.vm.currentOpenModel.tabs.find(x => x.name === tabName);
        this.loadTabContent(this.vm.selectedTab);
    }

    loadTabContent(tab) {
        fetch(tab.content).then(data => data.text()).then(data => {
            document.getElementById("currentTabContent").innerHTML = data;

            if (tab.callback) {
                setTimeout(() => {
                    tab.callback();
                }, 500);
            }

            /* if (document.querySelector('#currentTabContent video')) {
                document.querySelector('#currentTabContent video').play();
            } */
        });

    }

    loadModel(model) {
        const m = MODELS.find(x => x.name === model);
        if (m) {
            console.log('Load model', m);
            this.vm.currentOpenModel = m;
            this.vm.selectedTab = m.tabs[0];
            this.loadTabContent(this.vm.selectedTab);
        }
    }

    reset() {
        this.currentOpenProject = undefined;
    }

    /**
     * @function controllers.threeDModelController#openModel
     * @description Function that opens a specific model item in a modal
     * @param {Obj} model The 3d model item
     */
    openModel(model) {
        this.$location.path('3dmodels/' + model.name);
    }

    closeProject() {
        $('#threeDModelModal').modal('toggle');
        $('.modal-backdrop').css('opacity', 0);
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        this.vm.selectedTab = undefined;
        this.$location.path('3dmodels/');
    }

}
