<div class="centeringBox marginTop">
    <div class="centeringInnerBox">
        <p class="standardText">
            <div data-ng-include src="'includes/loadBox.html'" data-ng-show="loading"></div>
            <div data-ng-show="!loading">
                <img class="artGalleryImg" src="{{ artItem.video ? 'img/play_icon.png' : '' }}"
                 style="background-image: url({{artItem.thumbnail.url}});" data-ng-click="openPhotoSwipe(artItem)" data-ng-repeat="artItem in art"/>
            </div>
        </p>
    </div>
</div>