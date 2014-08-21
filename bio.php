<!DOCTYPE html>
<html xmlns="http:/www.w3.org/1999/xhtml">
    <head>
        <?php include("includes/head.php"); ?>
    </head>
    <body>
        <p id="sizeIndicator"></p>
        <?php include("includes/topBar.php"); ?>
        <div id="main">
            <?php include("includes/menu.php"); ?>
            <div id="contentBar">
                <div id="socialMediaIconsContainer">
                    <span id="previewTitle"></span>
                    <div id="linksInnerContainer">
                        <a href="http://se.linkedin.com/pub/martin-sonesson/47/b65/200" target="_blank" displayText="LinkedIn"><img alt="LinkedIn" src="img/socialMediaIcons/LinkedIn.png"></a>
                        <a href="http://www.github.com/ToWelie89" target="_blank" displayText="GitHub"><img alt="GitHub" src="img/socialMediaIcons/GitHub.png"></a>
                        <a href="https://twitter.com/Martin_Sonesson" target="_blank" displayText="Twitter"><img alt="Twitter" src="img/socialMediaIcons/Twitter.png"></a>
                    </div>
                </div>
                <div class="mainContentItem" style="margin-top: 120px; width: 100%; padding: 20px 30px 20px 30px;">
                    <img src="img/avatar.JPG" style="float: left; width: 15%;">
                    <div style="float: left; width: 85%; text-align: center;">
                       <div class="table center">
                            <div class="tableRow">
                                 <span class="tableRowCell">
                                    <p class="rowKeySpan">
                                        Age
                                    </p>
                                 </span>
                                 <span class="tableRowCell">
                                    <p class="rowValueSpan">
                                        24
                                    </p>
                                 </span>
                            </div>
                            <div class="tableRow">
                                 <span class="tableRowCell">
                                    <p class="rowKeySpan">
                                        Location
                                    </p>
                                 </span>
                                 <span class="tableRowCell">
                                    <p class="rowValueSpan">
                                        <a href="https://www.google.se/maps/place/G%C3%B6teborg/@57.7019548,11.8936825,11z/" target="_blank">
                                            Gothenburg, Sweden
                                        </a>
                                    </p>
                                 </span>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
       </div>
    </body>
</html>