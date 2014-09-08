require(['jquery'], function($) {
    $(document).ready(function(){
    	$(".projectsLink").click(projectsLinkClickHandler);
        $("#backLink").click(backLinkClickHandler);
    });

    function projectsLinkClickHandler() {
        $("#info").text($(this).attr("for"));
        $("#projectsMenu").animate({
            opacity: "0.0"
        }, 300);
        $("#projectInfo").fadeIn(300);
    }

    function backLinkClickHandler() {
        $("#projectsMenu").animate({
            opacity: "1.0"
        }, 300);
        $("#projectInfo").fadeOut(300);
    }
});