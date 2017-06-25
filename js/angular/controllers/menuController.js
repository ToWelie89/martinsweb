/**
 * @constructor MenuController
 * @memberof controllers
 * @description Controller for menu
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {services.PageUrlService} pageUrlService - Service for reading GET-parameters from the URL.
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 */
export default class MenuController {
    constructor($scope, pageUrlService, $timeout) {
        this.vm = this;
        this.pageUrlService = pageUrlService;
        this.$timeout = $timeout;

        this.slideTime = 350;
        this.vm.menu = {};

        // Public function
        this.vm.mainMenuClickEvent = this.mainMenuClickEvent;
        this.vm.currentPage = this.currentPage;
        this.vm.getPageName = this.getPageName;
        this.vm.init = this.init;

        fetch('json/menu.json')
        .then(resp => resp.json())
        .then(res => {
            this.vm.menu = res;
        });
    }

    init() {
        this.$timeout(() => {
            this.mainMenuClickEvent(null);
        }, 200);
    }

    /**
     * @function controllers.MenuController#mainMenuClickEvent
     * @description Function for the event when user clicks a main menu item. Hides/shows the correct submenu
     * @param {Obj} id The id for the clicked menu item
     */
    mainMenuClickEvent(id) {
        if (id === this.pageUrlService.getCurrentMainPage() || !id) {
            $('.subMenuBar').slideUp(this.slideTime);
            $('.subMenuBar[for="' + this.pageUrlService.getCurrentMainPage() + '"]').slideDown(this.slideTime);
            return;
        }

        $('.subMenuBar').slideUp(this.slideTime);
        var submenuElement = $('.subMenuBar[for="' + id + '"]');

        if (submenuElement.length > 0) {
            var displayStyle = submenuElement.css('display');
            if (displayStyle === 'none') {
                submenuElement.slideDown(this.slideTime);
            } else {
                submenuElement.slideUp(this.slideTime);
                var selectedSubmenuElement = $('.subMenuBar[for="' + this.pageUrlService.getCurrentMainPage() + '"]');
                if (selectedSubmenuElement.length > 0) {
                    selectedSubmenuElement.slideDown(this.slideTime);
                }
            }
        }
    }

    /**
     * @function controllers.MenuController#getPageName
     * @description Function for getting the current page name
     * @returns {string} The current page name
     */
    getPageName() {
        return this.pageUrlService.getPageName();
    }

    /**
     * @function controllers.MenuController#currentPage
     * @description Function for getting the current main page
     * @returns {string} The current main page
     */
    currentPage() {
        return this.pageUrlService.getCurrentMainPage();
    }
}
