require(['jquery'], function($) {
    $(document).ready(function(){
    	$(".projectsLink").click(projectsLinkClickHandler);
        $("#backLink").click(backLinkClickHandler);
    });

    function projectsLinkClickHandler() {
        $("#projectInfo").load("../includes/projects/"+$(this).attr("for")+".php", function(){
            $("#projectsMenu").animate({
                opacity: "0.0"
            }, 300);
            $("#projectInfo").fadeIn(300);
            $("#backLink").click(backLinkClickHandler);
        });
    }

    function backLinkClickHandler() {
        $("#projectsMenu").animate({
            opacity: "1.0"
        }, 300);
        $("#projectInfo").fadeOut(300);
        $("#projectInfo").html("");
    }
});