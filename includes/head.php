<link rel="shortcut icon" href="/build/assets/icon.ico">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="utf-8"/>
<meta http-equiv="Cache-control" content="public">
<meta name="description" content="Portfolio and personal website of webdeveloper, programmer and software engineer Martin Sonesson">
<meta name="keywords" content="HTML,CSS,XML,JavaScript,Martin,Sonesson,art,blog,tech,photos,videos,cv,biography,bio,projects,android,angular,java,c#">
<meta name="author" content="Martin Sonesson">
<meta name="theme-color" content="#457bc3">

<!-- Bootstrap -->
<link href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
<link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<!-- Font awesome -->
<link rel="stylesheet" href="css/cssLibs/font-mfizz.css">

<!-- Light gallery -->
<link type="text/css" rel="stylesheet" href="node_modules/lightgallery/dist/css/lightgallery.min.css" />
<link type="text/css" rel="stylesheet" href="node_modules/lightgallery/dist/css/lg-transitions.min.css" />

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
<style rel="stylesheet" type="text/css">
    @@syntaxHighlighterCss
</style>
<style rel="stylesheet" type="text/css">
    @@syntaxHighlighterThemeCss
</style>

<!-- Local libs -->
<script type="text/javascript" src="js/libs/shCore.js"></script>
<script type="text/javascript" src="js/libs/shBrushBash.js"></script>
<script type="text/javascript" src="js/libs/shBrushXml.js"></script>
<script type="text/javascript" src="js/libs/shBrushPhp.js"></script>
<script type="text/javascript" src="js/libs/shBrushCss.js"></script>
<script type="text/javascript" src="js/libs/shBrushJScript.js"></script>

<script async src="js/libs/trianglify.js"></script>
<script async src="/build/photoswipe.min.js"></script>
<script async src="js/libs/photoswipe/photoswipe-ui-default.min.js"></script>
<script async src="/build/MapEditor.min.js"></script>
<!-- <script async src="js/libs/snowstorm-min.js"></script> -->
<script defer src="https://use.fontawesome.com/releases/v5.0.0/js/all.js"></script>

<!-- Node module libs -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="node_modules/angular-sanitize/angular-sanitize.min.js"></script>
<script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js"></script>
<script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>

<!-- light gallery -->
<script src="node_modules/lightgallery/dist/js/lightgallery.min.js"></script>
<script src="node_modules/lg-video/dist/lg-video.min.js"></script>
<script src="node_modules/lg-thumbnail/dist/lg-thumbnail.min.js"></script>
<script src="node_modules/lg-fullscreen/dist/lg-fullscreen.min.js"></script>
<script src="node_modules/lg-autoplay/dist/lg-autoplay.min.js"></script>
<script src="node_modules/lg-zoom/dist/lg-zoom.min.js"></script>
<script src="node_modules/lg-hash/dist/lg-hash.min.js"></script>
<script src="node_modules/lg-pager/dist/lg-pager.min.js"></script>

<!-- martins-web angular -->
<script src="/build/app.bundle.js"></script>

<script>
    window.onload = function() {
        var pattern = Trianglify({
            width: 3840,
            height: 2160,
            variance: 1,
            seed: 'dont forget to bring a towel',
            cell_size: 120,
            x_colors: ['#000000', '#2e3192', '#ffffff'],
            y_colors: ['#ffffff', '#1b1464', '#000000']
        });
        $('.mainBg').html(pattern.canvas());
        $('.mainBg canvas').attr('id', 'canvasBg');
    };
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68930281-1', 'auto');
  ga('send', 'pageview');
</script>

<title>
    martinsonesson.se
</title>