require(['jquery', 'helpers'], function($, helpers) {
    $(document).ready(function(){
    	var loadBox = $("#loadBox");
    	var contentId = $("#content").attr("content");
    	$("#content").load("../includes/mainContent/"+contentId+"Content.php", callback);
    });

    function callback(){
    	$("#loadingindicator").hide();
    	$("#content").fadeIn(300);
    	helpers.loadContentSpecificScripts();
    }
});