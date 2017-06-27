/*
    IMPORTS
*/

import {ART} from './../../configFiles/art';

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

        this.formatArt(ART);
    }

    /**
     * @function controllers.ArtController#formatArt
     * @description Function reads the data and generates list used for view and photoswipe
     * @param {Obj} art The data containing all art information
     */
    formatArt(art) {
        art.forEach(artItem => {
            this.vm.art.push({
                thumbnail: artItem.thumbnail,
                bigImage: artItem.bigImage,
                video: (artItem.video ? artItem.video : null),
                index: this.vm.art.length,
                width: artItem.width,
                height: artItem.height
            });
        });

        this.vm.art.forEach(artItem => {
            if(artItem.video) {
                this.items.push({
                    html: `<div class="videoSlide"><div class="videoSlideInner"><video id="videoPlayer${artItem.index}" controls><source src="${artItem.video}" type="video/mp4" /></video></div></div>`,
                    index: artItem.index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            } else {
                this.items.push({
                    src: artItem.bigImage,
                    w: artItem.width,
                    h: artItem.height,
                    index: artItem.index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            }
        });

        this.vm.loading = false;
    }

    /**
     * @function controllers.ArtController#openPhotoSwipe
     * @description Function that opens a specific item in Photoswipe
     * @param {Obj} artItem The art item, video or image
     */
    openPhotoSwipe(artItem) {
        const pswpElement = document.querySelectorAll('.pswp')[0];

        // define options (if needed)
        const options = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,
            index: artItem.index,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
    }
}
