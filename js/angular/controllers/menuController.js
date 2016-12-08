(function() {
    var app = angular.module('martinsWeb');

    /**
     * @constructor MenuController
     * @memberof controllers
     * @description Controller for menu
     * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
     * @param {$location} $location - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$location}
     * @param {services.PageUrlService} pageUrlService - Service for reading GET-parameters from the URL.
     * @param {$http} $http - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$http}
     * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
     */
    var menuController = ['$scope', '$location', 'pageUrlService', '$http', '$log', function($scope, $location, pageUrlService, $http, $log) {

        // Private variables
        var slideTime = 350;

        // Public variables
        $scope.menu = {};

        // Public function
        $scope.mainMenuClickEvent = mainMenuClickEvent;
        $scope.currentPage = currentPage;
        $scope.getPageName = getPageName;

        /**
         * @function controllers.MenuController#init
         * @description Initilization function
         */
        function init() {
            $http.get('json/menu.json').success(function(data) {
                $scope.menu = data;
                $log.debug(data);
            });

            setTimeout(function() {
                mainMenuClickEvent(null);
            }, 200);
        }

        /**
         * @function controllers.MenuController#mainMenuClickEvent
         * @description Function for the event when user clicks a main menu item. Hides/shows the correct submenu
         * @param {Obj} id The id for the clicked menu item
         */
        function mainMenuClickEvent(id) {
            if (id === pageUrlService.getCurrentMainPage() || !id) {
                $('.subMenuBar').slideUp(slideTime);
                $('.subMenuBar[for="' + pageUrlService.getCurrentMainPage() + '"]').slideDown(slideTime);
                return;
            }

            $('.subMenuBar').slideUp(slideTime);

            var submenuElement = $('.subMenuBar[for="' + id + '"]');

            if (submenuElement.length > 0) {
                var displayStyle = submenuElement.css('display');
                if (displayStyle === 'none') {
                    submenuElement.slideDown(slideTime);
                } else {
                    submenuElement.slideUp(slideTime);
                    var selectedSubmenuElement = $('.subMenuBar[for="' + pageUrlService.getCurrentMainPage() + '"]');
                    if (selectedSubmenuElement.length > 0) {
                        selectedSubmenuElement.slideDown(slideTime);
                    }
                }
            }
        };

        /**
         * @function controllers.MenuController#getPageName
         * @description Function for getting the current page name
         * @returns {string} The current page name
         */
        function getPageName() {
            return pageUrlService.getPageName();
        }

        /**
         * @function controllers.MenuController#currentPage
         * @description Function for getting the current main page
         * @returns {string} The current main page
         */
        function currentPage() {
            return pageUrlService.getCurrentMainPage();
        };

        init();
    }];

    app.controller('menuController', menuController);
}());
