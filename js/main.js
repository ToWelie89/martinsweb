require(['jquery', 'constants', 'helpers'], function($, constants, helpers) {
    /**************INITIALIZATION****************/
    $(document).ready(function(){
    	// Scripts that will always be included

    	// Menu scripts
        require(['menu']);

        // Loader for content on page
        require(['contentLoader']);
    });
});