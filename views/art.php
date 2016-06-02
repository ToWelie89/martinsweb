<div class="centeringBox marginTop">
    <div class="centeringInnerBox">
        <p class="standardText">
            <div data-ng-include src="'includes/loadBox.html'" data-ng-show="loading"></div>
            <div data-ng-show="!loading">
                <img class="artGalleryImg" src="{{ artItem.video ? '../../assets/build/play_icon.png' : '../../assets/build/blank-overlay.png' }}" width="150" height="150"
                 style="background-image: url({{artItem.thumbnail}});" data-ng-click="openPhotoSwipe(artItem)"
                 data-ng-repeat="artItem in art"/>
            </div>
        </p>
    </div>
</div>