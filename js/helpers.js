define(function() {

	function getFileNameForPage()
	{
		var currentPageFileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
		currentPageFileName = currentPageFileName.replace(".html", "");
		currentPageFileName = currentPageFileName.replace(".php", "");
		return currentPageFileName;
	}

	function getPageMappingFromFileName()
	{
		var fileName = getFileNameForPage();

		switch (fileName){
			case "":
			case "index":
				return "start";
			default:
				return fileName;
		}
	}
	
	return {
		getFileNameForPage: getFileNameForPage,
		getPageMappingFromFileName: getPageMappingFromFileName
	}
});