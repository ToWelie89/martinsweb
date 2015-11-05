<div class="centeringBox marginTop">
    <div class="centeringInnerBox">
        <p class="standardText">
            <div data-ng-include src="'includes/loadBox.html'" data-ng-show="loading"></div>
            <div data-ng-show="!loading">
                <img src="{{art.thumbnail.url}}" class="artGalleryImg" data-ng-repeat="art in art" />
            </div>
        </p>
    </div>
</div>