(function() {
    var app = angular.module("martinsWeb");

    var menuController = ['$scope', '$location', 'pageUrlService', '$http', '$log', function($scope, $location, pageUrlService, $http, $log) {
        var slideTime = 350;
        $scope.menu = {};

        function init() {
            $http.get('json/menu.json').success(function(data) {
                $scope.menu = data;
                $log.debug(data);
            });

            setTimeout(function() {
                $scope.mainMenuClickEvent(null);
            }, 200);
        }

        $scope.mainMenuClickEvent = function(id) {
            if (id === pageUrlService.getCurrentMainPage() || !id) {
                $(".subMenuBar").slideUp(slideTime);
                $(".subMenuBar[for='" + pageUrlService.getCurrentMainPage() + "']").slideDown(slideTime);
                return;
            }

            $(".subMenuBar").slideUp(slideTime);

            var submenuElement = $(".subMenuBar[for='" + id + "']");

            if (submenuElement.length > 0) {
                var displayStyle = submenuElement.css("display");
                if (displayStyle === "none") {
                    submenuElement.slideDown(slideTime);
                } else {
                    submenuElement.slideUp(slideTime);
                    var selectedSubmenuElement = $(".subMenuBar[for='" + pageUrlService.getCurrentMainPage() + "']");
                    if (selectedSubmenuElement.length > 0) {
                        selectedSubmenuElement.slideDown(slideTime);
                    }
                }
            }
        };

        $scope.currentPage = function() {
            return pageUrlService.getCurrentMainPage();
        };

        init();
    }];

    app.controller("menuController", menuController);
}());