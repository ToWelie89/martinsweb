<div class="centeringBox">
    <div class="centeringInnerBox">
        <p class="standardText">
            <div data-ng-include src="'includes/loadBox.html'" data-ng-show="loading"></div>
            <div data-ng-show="!loading">
                <div data-ng-repeat="art in art">
                    <img src="{{art.thumbnail.url}}" />
                </div>
            </div>
        </p>
    </div>
</div>