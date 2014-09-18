require(['jquery'], function($) {
    $(document).ready(function(){
    	$(".projectsLink").click(projectsLinkClickHandler);
        $("#backLink").click(backLinkClickHandler);
    });

    function clickOutsideHandler (e)
    {
        var container = $("#projectInfoInner");
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $("#projectInfo").fadeOut(300);
            $("#projectsMenu").animate({
                opacity: "1.0"
            }, 300, function(){
                $("#projectInfo div").html("");
            });
            $(document).unbind();
        }
    }

    function projectsLinkClickHandler() {
        console.log("tjaaaa");
        $("#projectInfo div").load("../includes/projects/"+$(this).attr("for")+".php", function(){
            $("#projectsMenu").animate({
                opacity: "0.5"
            }, 300);
            $("#projectInfo").fadeIn(300);
            $("#backLink").click(backLinkClickHandler);
            $(document).mouseup(clickOutsideHandler);
        });
    }

    function backLinkClickHandler() {
        $("#projectInfo").fadeOut(300);
        $("#projectsMenu").animate({
            opacity: "1.0"
        }, 300, function(){
            $("#projectInfo div").html("");
        });
        $(document).unbind();
    }
});