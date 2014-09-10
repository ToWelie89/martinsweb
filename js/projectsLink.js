require(['jquery'], function($) {
    $(document).ready(function(){
    	$(".projectsLink").click(projectsLinkClickHandler);
        $("#backLink").click(backLinkClickHandler);
    });

    function projectsLinkClickHandler() {
        console.log("tjaaaa");
        $("#projectInfo div").load("../includes/projects/"+$(this).attr("for")+".php", function(){
            $("#projectsMenu").animate({
                opacity: "0.5"
            }, 300);
            $("#projectInfo").fadeIn(300);
            $("#backLink").click(backLinkClickHandler);
        });
    }

    function backLinkClickHandler() {
        $("#projectInfo").fadeOut(300);
        $("#projectsMenu").animate({
            opacity: "1.0"
        }, 300, function(){
            $("#projectInfo div").html("");
        });
    }
});