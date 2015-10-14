<!DOCTYPE html>
<html xmlns="http:/www.w3.org/1999/xhtml" lang="sv">
    <head>
        <?php include("includes/head.php"); ?>
    </head>
        <body ng-app="martinsWeb" data-ng-controller="mainController">
            <div class="mainBg"></div>
            <p id="sizeIndicator"></p>
            <?php include("includes/topBar.php"); ?>
            <div id="main">
                <?php include("includes/menu.php"); ?>
                <div id="contentBar">
                    <div data-ng-view></div>
                </div>
           </div>
    </body>
</html>