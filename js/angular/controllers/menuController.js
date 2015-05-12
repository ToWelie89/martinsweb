(function() {
    var app = angular.module("martinsWeb");

    var menuController = ['$scope', '$location', 'pageUrlService', function($scope, $location, pageUrlService) {
        var slideTime = 350;

        function init() {
            $(".mainMenuLink").click(mainMenuLinkClickHandler);
            mainMenuLinkClickHandler();
        }

        function mainMenuLinkClickHandler() {
            var id = $(this).attr("id");

            if (id === pageUrlService.getCurrentMainPage() || !id) {
                $(".subMenuBar").slideUp(slideTime);
                $(".subMenuBar[for='" + pageUrlService.getCurrentMainPage() + "']").slideDown(slideTime);
                return;
            }

            $(".subMenuBar").slideUp(slideTime);

            var submenuElement = $(".subMenuBar[for='" + id + "']");

            if (submenuElement.length > 0) {
                var displayStyle = submenuElement.css("display");
                if (displayStyle == "none") {
                    submenuElement.slideDown(slideTime);
                } else {
                    submenuElement.slideUp(slideTime);
                    var selectedSubmenuElement = $(".subMenuBar[for='" + pageUrlService.getCurrentMainPage() + "']");
                    if (selectedSubmenuElement.length > 0) {
                        selectedSubmenuElement.slideDown(slideTime);
                    }
                }
            }
        }

        init();
    }];

    app.controller("menuController", menuController);
}());