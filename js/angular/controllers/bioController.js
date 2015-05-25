(function() {
    var app = angular.module("martinsWeb");

    var bioController = ['$scope', 'mediaQueryService', function($scope, mediaQueryService) {

        function mouseOver() {
            if (mediaQueryService.getCurrentMediaQuery() === 'LARGE')
            {
                $("#previewTitle").stop(true, true);
                var text = $(this).attr("displayText");
                $("#previewTitle").text(text);
                $("#previewTitle").fadeIn(600);
            }
        }

        function mouseOut() {
            if (mediaQueryService.getCurrentMediaQuery() === 'LARGE')
            {
                $("#previewTitle").fadeOut(300);
            }
        }

        function init() {
            $("#linksInnerContainer a").hover(mouseOver, mouseOut);
        }

        init();
    }];

    app.controller("bioController", bioController);
}());