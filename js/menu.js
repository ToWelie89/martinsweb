require(['jquery', 'helpers'], function($, helpers) {
	var slideTime = 350;

    $(document).ready(function(){
    	$(".mainMenuLink").click(mainMenuLinkClickHandler);
    	setCurrentPageMainMenuLinkToActive();
    });

    function mainMenuLinkClickHandler(){
    	$(".mainMenuLink").removeClass("active");
    	$(".subMenuBar").slideUp(slideTime);

    	var id = $(this).attr("id");
    	var pageId = helpers.getPageMappingFromFileName();
    	var submenuElement = $(".subMenuBar[for='"+id+"']");

    	if (submenuElement.length > 0)
    	{
    		var displayStyle = submenuElement.css("display");
    		if (displayStyle == "none")
    		{
    			$(this).addClass("active");
    			submenuElement.slideDown(slideTime);
    		}
    		else
    		{
    			$(this).removeClass("active");
    			submenuElement.slideUp(slideTime);
    			setCurrentPageMainMenuLinkToActive();
    		}
    	}
    	else
    	{
    		setCurrentPageMainMenuLinkToActive();
    	}
    }

    function setCurrentPageMainMenuLinkToActive()
    {
    	var currentPage = helpers.getPageMappingFromFileName();
    	$(".mainMenuLink[id='"+currentPage+"']").addClass("active");
    }
});