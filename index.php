<!DOCTYPE html>
<html xmlns="http:/www.w3.org/1999/xhtml">
    <head>
        <?php include("includes/head.php"); ?>
        <!-- Twitter script -->
        <script>
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        </script>
    </head>
    <body>
        <p id="sizeIndicator"></p>
        <?php include("includes/topBar.php"); ?>
        <div id="main">
            <?php include("includes/menu.php"); ?>
            <div id="contentBar">
                <?php include("includes/loadBox.php"); ?>
                <div id="content" content="index"></div>
            </div>
       </div>
    </body>
</html>