import {ART} from './../configFiles/art';
import ArtController from './../angular/controllers/artController';

console.log('UNIT TESTS FOR artController.js');

describe('artController tests', () => {
    let artController;

    beforeEach(() => {
        artController = new ArtController({}, {});
    });

    it('Init art', () => {
        // Assert
        expect(artController.art.length).toEqual(ART.length);
        expect(artController.items.length).toEqual(ART.length);
        expect(artController.loading).toEqual(false);
    });
});
