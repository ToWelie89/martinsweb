<link rel="shortcut icon" href="img/icon.ico">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="utf-8"/>
<meta http-equiv="Cache-control" content="public">

<!-- Main CSS -->
<style>
    @@defaultCss
</style>

<!-- CSS libs -->
<style>
    @@photoSwipeCss
</style>
<style>
    @@photoSwipeDefaultSkinCss
</style>

<!-- Local libs -->
<script async src="js/libs/trianglify.js"></script>
<script async src="js/libs/photoswipe/photoswipe.js"></script>
<script async src="js/libs/photoswipe/photoswipe-ui-default.min.js"></script>
<script async src="/assets/build/MapEditor.min.js"></script>
<script async src="js/libs/snowstorm-min.js"></script>

<script>
    //snowStorm.flakesMaxActive = 96;    // show more snow on screen at once
    //snowStorm.useTwinkleEffect = true; // let the snow flicker in and out of view
</script>

<!-- Node module libs -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>

<!-- martins-web angular -->
<script src="/assets/build/martins-web.min.js"></script>

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
    /* Lazy load css */
    var cb = function() {
        var l = document.createElement('link'); l.rel = 'stylesheet';
        l.href = 'assets/build/small.css';
        var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
    };

    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
              webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(cb);
    else window.addEventListener('load', cb);
</script>

<!--

<script>
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&appId=689778051059856&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-68930281-1', 'auto');
  ga('send', 'pageview');
</script>

-->

<title>
    martinsonesson.se
</title>