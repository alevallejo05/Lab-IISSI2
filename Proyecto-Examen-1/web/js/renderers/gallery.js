"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { albumRenderer } from "/js/renderers/album.js";

const galleryRenderer = {
    asCardGallery: function (albums) {
        let galleryContainer = parseHTML('<div class="album-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);

        for (let album of albums) {
            let card = albumRenderer.asCard(album);
            row.appendChild(card);
        }

        return galleryContainer;
    }
};

export { galleryRenderer };