/*
    IMPORTS
*/

import {MENU} from './../../configFiles/menu';

/**
 * @constructor MenuController
 * @memberof controllers
 * @description Controller for menu
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {services.PageUrlService} pageUrlService - Service for reading GET-parameters from the URL.
 * @param {$timeout} $timeout - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$timeout}
 */
export default class MenuController {
    constructor($scope, pageUrlService, $timeout) {
        this.vm = this;
        this.pageUrlService = pageUrlService;
        this.$timeout = $timeout;

        this.slideTime = 350;

        // Public function
        this.vm.mainMenuClickEvent = this.mainMenuClickEvent;
        this.vm.currentPage = this.currentPage;
        this.vm.getPageName = this.getPageName;
        this.vm.init = this.init;
        this.vm.isSelected = this.isSelected;

        this.vm.menu = MENU;
    }

    /**
     * @function controllers.MenuController#init
     * @description Initialization function
     */
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
     * @function controllers.MenuController#isSelected
     * @description Function for determining if a specified submenu item is currently selected
     * @returns {boolean} True if the current sub menu item is selected, otherwise false
     */
    isSelected(submenuItemName) {
        const pageName = this.pageUrlService.getPageName();
        if (pageName === submenuItemName || pageName === submenuItemName.replace(' ', '')) {
            return true;
        } else if (pageName.includes(`${submenuItemName}/`)) {
            return true;
        } else {
            return false;
        }
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
