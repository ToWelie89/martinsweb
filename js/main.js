require(['jquery', 'constants', 'helpers'], function($, constants, helpers) {
    /**************INITIALIZATION****************/
    $(document).ready(function(){
    	// Scripts that will always be included
        require(['menu']);
        require(['contentLoader']);
    });
});