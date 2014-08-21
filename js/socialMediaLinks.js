$(document).ready(function(){
	$("#linksInnerContainer a").hover(mouseOver, mouseOut);

	function mouseOver(){
		$("#previewTitle").stop(true, true);
		var text = $(this).attr("displayText");
		$("#previewTitle").text(text);
		$("#previewTitle").fadeIn(600);
	}

	function mouseOut(){
		$("#previewTitle").fadeOut(300);
	}
});