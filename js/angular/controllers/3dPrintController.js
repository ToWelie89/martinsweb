/*
    IMPORTS
*/

import {PRINTS} from './../../configFiles/3dPrints';

/**
 * @constructor threeDPrintController
 * @memberof controllers
 * @description Controller for handling presentation logic in art gallery section
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 * @param {$log} $log - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$log}
 */
export default class ThreeDPrintController {
    constructor($scope, $log) {
        this.vm = this;

        // Public variables
        this.vm.prints = [];
        this.vm.loading = true;

        // Public methods
        this.vm.openPhotoSwipe = this.openPhotoSwipe;

        // Private variables
        this.items = [];

        this.formatPrints(PRINTS);
    }

    /**
     * @function controllers.threeDPrintController#formatPrints
     * @description Function reads the data and generates list used for view and photoswipe
     * @param {Obj} art The data containing all art information
     */
    formatPrints(print) {
        print.forEach(printItem => {
            this.vm.prints.push({
                thumbnail: printItem.thumbnail,
                bigImage: printItem.bigImage,
                video: (printItem.video ? printItem.video : null),
                index: this.vm.prints.length,
                width: printItem.width,
                height: printItem.height
            });
        });

        this.vm.prints.forEach(printItem => {
            if(printItem.video) {
                this.items.push({
                    html: `<div class="videoSlide"><div class="videoSlideInner"><video id="videoPlayer${printItem.index}" controls><source src="${printItem.video}" type="video/mp4" /></video></div></div>`,
                    index: printItem.index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            } else {
                this.items.push({
                    src: printItem.bigImage,
                    w: printItem.width,
                    h: printItem.height,
                    index: printItem.index,
                    title: 'Slide right or left to change item. Slide down or up to close current item.'
                });
            }
        });

        this.vm.loading = false;
    }

    /**
     * @function controllers.threeDPrintController#openPhotoSwipe
     * @description Function that opens a specific item in Photoswipe
     * @param {Obj} printItem The art item, video or image
     */
    openPhotoSwipe(printItem) {
        const pswpElement = document.querySelectorAll('.pswp')[0];

        // define options (if needed)
        const options = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,
            index: printItem.index,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, options);
        gallery.init();
    }
}
