$(document).ready(function(){
	$(".mainMenuLink").click(mainMenuLinkClickHandler);
});

function mainMenuLinkClickHandler(){
	$(".mainMenuLink").removeClass("active");
	$(".subMenuBar").slideUp(150);

	var id = $(this).attr("id");
	var submenuElement = $(".subMenuBar[for='"+id+"']");
	var displayStyle = submenuElement.css("display");

	if (displayStyle == "none")
	{
		$(this).addClass("active");
		submenuElement.slideDown(150);
	}
	else
	{
		$(this).removeClass("active");
		submenuElement.slideUp(150);
	}
}