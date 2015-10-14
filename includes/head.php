<link rel="shortcut icon" href="img/icon.ico">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="utf-8"/>
<link rel="stylesheet" type="text/css" href="css/default.css">

<!-- Libs -->
<script src="js/libs/trianglify.js"></script>
<script src="js/libs/modernizr.custom.js"></script>
<script src="js/libs/jquery-2.1.1.min.js"></script>
<script src="js/libs/angular.min.js"></script>
<script src="js/libs/angular-route.min.js"></script>
<script src="js/MapEditor.js"></script>

<!-- Angular settings -->
<script src="js/angular/config/app.js"></script>

<!-- Angular controllers -->
<script src="js/angular/controllers/menuController.js"></script>
<script src="js/angular/controllers/mainController.js"></script>
<script src="js/angular/controllers/projectsController.js"></script>
<script src="js/angular/controllers/gyroSnakeEditorController.js"></script>
<script src="js/angular/controllers/bioController.js"></script>
<script src="js/angular/controllers/cvController.js"></script>

<!-- Angular services -->
<script src="js/angular/services/pageUrlService.js"></script>
<script src="js/angular/services/mediaQueryService.js"></script>

<script>
    window.onload = function() {
        var pattern = Trianglify({
	        width: 3840,
	        height: 2160,
	        variance: 1,
	        seed: 'dont forget to bring a towel',
	        cell_size: 120,
	        x_colors: ['#000000', '#2e3192','#ffffff'],
	        y_colors: ['#ffffff', '#1b1464','#000000']
	    });
	    $(".mainBg").html(pattern.canvas());

	    $(".mainBg canvas").attr("id", "canvasBg");

		//$(window).resize(resizeCanvas);
		function resizeCanvas() {
	        var pattern = Trianglify({
		        width: window.innerWidth,
		        height: window.innerHeight
		    });
		    $(".mainBg").html(pattern.canvas());
		}
      }
</script>

<script>
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&appId=689778051059856&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
<title>
    martinsonesson.se
</title>