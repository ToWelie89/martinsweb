$(document).ready(function(){
	$(".mainMenuLink").click(mainMenuLinkClickHandler);
});

function mainMenuLinkClickHandler(){
	var id = $(this).attr("id");
	var submenuElement = $(".subMenuBar[for='"+id+"']");
	var displayStyle = submenuElement.css("display");

	$(".subMenuBar").hide();

	if (displayStyle == "none")
	{
		var xOffset = ($(this).offset().left - $("#menu").offset().left + 10);

		submenuElement.css("margin-left", xOffset);
		submenuElement.show();
	}
	else
	{
		submenuElement.hide();
	}
}