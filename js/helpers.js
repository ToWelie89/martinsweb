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
			case "profile":
			case "bio":
			case "cv":
				return "profile";
			case "personalProjects":
			case "groupProjects":
			case "projects":
				return "projects";
			case "misc":
			case "blog":
			case "art":
			case "videos":
			case "photos":
				return "misc";
			default:
				return fileName;
		}
	}

	function loadContentSpecificScripts(){
		if ($("#socialMediaIconsContainer").length > 0)
		{
			require(['socialMediaLinks']);
		}
	}

	
	return {
		getFileNameForPage: getFileNameForPage,
		getPageMappingFromFileName: getPageMappingFromFileName,
		loadContentSpecificScripts: loadContentSpecificScripts
	}
});