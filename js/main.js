require(['jquery', 'constants', 'helpers'], function($, constants, helpers) {
    /**************INITIALIZATION****************/
    $(document).ready(function(){
    	// Scripts that will always be included
        require(['menu']);
        
        // Load in scripts that are specific for some modules
        if ($("#socialMediaIconsContainer").length > 0)
        {
        	require(['socialMediaLinks']);
        }
    });
});