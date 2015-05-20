<div data-ng-controller="menuController">
    <div id="menu">
        <a class="link mainMenuLink" id="start" href="/#/" data-ng-class="{active: getCurrentMainPage() == 'start'}"><span data-hover="START">START</span></a>
        <a class="link mainMenuLink" id="profile" data-ng-class="{active: getCurrentMainPage() == 'profile'}"><span data-hover="PROFILE">PROFILE</span></a>
        <a class="link mainMenuLink" id="projects" href="#projects"  data-ng-class="{active: getCurrentMainPage() == 'projects'}"><span data-hover="PROJECTS">PROJECTS</span></a>
        <a class="link mainMenuLink" id="misc" data-ng-class="{active: getCurrentMainPage() == 'misc'}"><span data-hover="MISC">MISC</span></a>

        <div class="fb-like" data-href="http://www.martinsonesson.se" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
    </div>
    <div id="subMenuContainer">
        <div class="subMenuBar" for="profile">
            <a class="link subMenuLink" id="bio" href="#bio" data-ng-class="{active: getCurrentSubPageName() == 'bio'}">BIO</a>
            <a class="link subMenuLink" id="cv" href="#cv">CV</a>
        </div>
        <div class="subMenuBar" for="misc">
            <a class="link subMenuLink" id="blog" href="#blog">BLOG</a>
            <a class="link subMenuLink" id="art" href="#art">ART</a>
            <a class="link subMenuLink" id="videos" href="#videos">VIDEOS</a>
            <a class="link subMenuLink" id="photos" href="#photos">PHOTOS</a>
        </div>
    </div>
</div>