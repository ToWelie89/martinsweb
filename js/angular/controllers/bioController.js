(function() {
    var app = angular.module("martinsWeb");

    var bioController = ['$scope', function($scope) {

        function mouseOver() {
            $("#previewTitle").stop(true, true);
            var text = $(this).attr("displayText");
            $("#previewTitle").text(text);
            $("#previewTitle").fadeIn(600);
        }

        function mouseOut() {
            $("#previewTitle").fadeOut(300);
        }

        function init() {
            $("#linksInnerContainer a").hover(mouseOver, mouseOut);
        }

        init();
    }];

    app.controller("bioController", bioController);
}());