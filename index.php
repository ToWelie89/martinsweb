<!DOCTYPE html>
<html xmlns="http:/www.w3.org/1999/xhtml" lang="en">
    <head>
        <?php include("includes/build/head.php"); ?>
    </head>
    <body ng-app="martinsWeb" data-ng-controller="mainController as main">
        <?php include("includes/photoswipe.php"); ?>

        <div class="mainBg" id="mainBgTop"></div>
        <div class="mainBg" id="mainBgBottom"></div>
        <p id="sizeIndicator"></p>
        <?php include("includes/topBar.php"); ?>
        <div id="main">
            <?php include("includes/menu.php"); ?>
            <div id="contentBar">
                <div data-ng-view></div>
            </div>
            <div id="versionBox">
                v{{ main.version }}
            </div>
       </div>
    </body>
</html>
