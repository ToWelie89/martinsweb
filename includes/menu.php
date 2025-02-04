<div data-ng-controller="menuController as controller" data-ng-init="controller.init()">
    <div id="menu">

        <span data-ng-repeat="menuItem in controller.menu">
            <a
                class="link mainMenuLink"
                data-ng-if="menuItem.href"
                data-ng-click="controller.mainMenuClickEvent(menuItem.name)"
                id="{{ menuItem.name }}"
                href="{{ menuItem.href ? menuItem.href : '' }}"
                data-ng-class="{active: controller.currentPage() == menuItem.name}"
            >
                    <span data-hover="{{ menuItem.name.toUpperCase() }}" data-ng-bind="menuItem.name.toUpperCase()"></span>
            </a>
            <a
                class="link mainMenuLink"
                data-ng-if="!menuItem.href"
                data-ng-click="controller.mainMenuClickEvent(menuItem.name)"
                id="{{ menuItem.name }}"
                data-ng-class="{active: controller.currentPage() == menuItem.name}"
            >
                <span data-hover="{{ menuItem.name.toUpperCase() }}" data-ng-bind="menuItem.name.toUpperCase()"></span>
            </a>
        </span>

        <div class="fb-like" data-href="http://www.martinsonesson.se" data-layout="button_count" data-action="like"
        data-show-faces="false" data-share="false"></div>
    </div>
    <div id="subMenuContainer">
        <div class="subMenuBar" for="{{ menuItem.name }}" data-ng-repeat="menuItem in controller.menu" data-ng-if="menuItem.submenu">
            <div data-ng-repeat="submenuItem in menuItem.submenu" class="link subMenuLink" id="{{ submenuItem.name }}" data-ng-class="{'selected': controller.isSelected(submenuItem.name)}">
                <a href="{{ submenuItem.href }}" data-ng-bind="submenuItem.name.toUpperCase()"></a>
            </div>
        </div>
    </div>
</div>