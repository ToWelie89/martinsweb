<div data-ng-controller="menuController">
    <div id="menu">
        <a class="link mainMenuLink" data-ng-repeat="menuItem in menu" data-ng-if="menuItem.href" 
           data-ng-click="mainMenuClickEvent(menuItem.name)" id="{{ menuItem.name }}" href="{{ menuItem.href ? menuItem.href : '' }}" 
           data-ng-class="{active: currentPage() == menuItem.name}">
            <span data-hover="{{ menuItem.name.toUpperCase() }}" data-ng-bind="menuItem.name.toUpperCase()"></span>
        </a>
        <a class="link mainMenuLink" data-ng-repeat="menuItem in menu" data-ng-if="!menuItem.href" 
           data-ng-click="mainMenuClickEvent(menuItem.name)" id="{{ menuItem.name }}" 
           data-ng-class="{active: currentPage() == menuItem.name}">
            <span data-hover="{{ menuItem.name.toUpperCase() }}" data-ng-bind="menuItem.name.toUpperCase()"></span>
        </a>
        <div class="fb-like" data-href="http://www.martinsonesson.se" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
    </div>
    <div id="subMenuContainer">
        <div class="subMenuBar" for="{{ menuItem.name }}" data-ng-repeat="menuItem in menu" data-ng-if="menuItem.submenu">
            <a data-ng-repeat="submenuItem in menuItem.submenu" class="link subMenuLink" id="{{ submenuItem.name }}" 
               href="{{ submenuItem.href }}" data-ng-bind="submenuItem.name.toUpperCase()"></a>
        </div>
    </div>
</div>