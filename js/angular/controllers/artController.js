/**
 * @constructor ArtController
 * @memberof controllers
 * @description Controller for handling presentation logic in art gallery section
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 */
export default class ArtController {
    constructor($scope, $log) {
        this.vm = this;

        // Public variables
        this.vm.art = [];
        this.vm.loading = true;

        // Public methods
        this.vm.openPhotoSwipe = this.openPhotoSwipe;

        // Private variables
        this.items = [];

        fetch('json/art.json')
        .then(resp => resp.json())
        .then(data => {
            this.formatArt(data);
            $scope.$apply();
        });
    }

    /**
     * @function controllers.ArtController#formatArt
     * @description Function reads the data and generates list used for view and photoswipe
     * @param {Obj} response The data containing all art information
     */
    formatArt(response) {
        for (var i = 0; i < response.length; i++) {
            this.vm.art.push({
                thumbnail: response[i].thumbnail,
                bigImage: response[i].bigImage,
                video: (response[i].video ? response[i].video : null),
                index: this.vm.art.length,
                width: response[i].width,
                height: response[i].height
            });
        }

        for (var j = 0; j < this.vm.art.length; j++) {
            if (this.vm.art[j].video) {
                this.items.push({
                    html: '<div class="videoSlide"><div class="videoSlideInner"><video id="videoPlayer' + this.vm.art[j].index + '" controls><source src="' +
                        this.vm.art[j].video + '" type="video/mp4" /></video></div></div>',
                    index: this.vm.art[j].index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            } else {
                this.items.push({
                    src: this.vm.art[j].bigImage,
                    w: this.vm.art[j].width,
                    h: this.vm.art[j].height,
                    index: this.vm.art[j].index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            }
        }

        this.vm.loading = false;
    }

    /**
     * @function controllers.ArtController#openPhotoSwipe
     * @description Function that opens a specific item in Photoswipe
     * @param {Obj} artItem The art item, video or image
     */
    openPhotoSwipe(artItem) {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        // define options (if needed)
        var options = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,
            index: artItem.index,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
    }
}
