require(['jquery'], function($) {
    $(document).ready(function(){
    	$(".readMoreLabel").click(readMoreLabelClickHandler);
    });

    function readMoreLabelClickHandler() {
        var id = $(this).attr("for");

        $(".showMoreBox").each(function(){
            if ($(this).attr("id") == id) {
                if ($(this).css("display") != "none")
                {
                    $(this).slideUp(300);
                }
                else {
                    $(this).slideDown(300);
                }
            }
            else {
                $(this).hide();
            }
        });
    }
});