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
                <div class="mainContentItem startPage">
                    <h2>
                        Welcome!
                    </h2>
                    <p class="textBody">
                        Greetings and welcome to my site. My name is Martin Sonesson and I'm a webdeveloper, programmer and software engineer. I intend to use this website as a portfolio and personal website. Here you will be able to find information about me and my resume. Under the projects section you will be able to find information and sources for different software projects I have personally developed or been a part of with others.<br>
                        I might also upload some personal media like artwork, drawings, videos and other creative things that I have made.
                    </p>
                    <p class="signature">
                        - Martin Sonesson
                    </p>
                </div>
                <div id="twitter">
                    <a class="twitter-timeline" href="https://twitter.com/Martin_Sonesson" data-widget-id="500444449390878722"></a>
                </div>
            </div>
       </div>
    </body>
</html>