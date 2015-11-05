(function() {
    var app = angular.module("martinsWeb");

    var menuController = ['$scope', '$location', 'pageUrlService', '$http', function($scope, $location, pageUrlService, $http) {
        var slideTime = 350;
        $scope.menu;
        $scope.currentPage = '';

        function init() {
            $scope.currentPage = pageUrlService.getCurrentMainPage();
            $http.get('json/menu.json').success(function(data) {
                $scope.menu = data;
            });

            //$scope.mainMenuClickEvent(null);
        }

        $scope.mainMenuClickEvent = function(id) {
            if (id === $scope.currentPage || !id) {
                $(".subMenuBar").slideUp(slideTime);
                $(".subMenuBar[for='" + $scope.currentPage + "']").slideDown(slideTime);
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
                    var selectedSubmenuElement = $(".subMenuBar[for='" + $scope.currentPage + "']");
                    if (selectedSubmenuElement.length > 0) {
                        selectedSubmenuElement.slideDown(slideTime);
                    }
                }
            }
        };

        init();
    }];

    app.controller("menuController", menuController);
}());