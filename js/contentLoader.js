$(document).ready(function(){
	var loadBox = $("#loadBox");
	var contentId = $("#content").attr("content");
	
	$("#content").load("../includes/mainContent/"+contentId+"Content.php", function(){
		$("#loadingindicator").hide();
		$("#content").fadeIn(300);
	});
});