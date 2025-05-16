"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { sessionManager } from "/js/utils/session.js";

const galleryRenderer = {
    asCardGallery: function (photosTags, photos, tags) {
        let galleryContainer = parseHTML('<div class="photo-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');

        galleryContainer.appendChild(row);
        let counter = 0;

        for (let photo of photos) {
            if (sessionManager.isLogged()) {
                if (sessionManager.getLoggedUser().username === "root" || 
                    (sessionManager.getLoggedUser().userId === photo.userId && photo.visibility === "Private")) {
                    let card = photoRenderer.asCardAdmin(photo, photosTags, tags);
                    row.appendChild(card);
                    counter += 1;

                    if (counter % 4 === 0) {
                        row = parseHTML('<div class="row"></div>');
                        galleryContainer.appendChild(row);
                    }
                }
            } else {
                let card = photoRenderer.asCard(photo, photosTags);
                row.appendChild(card);
                counter += 1;

                if (counter % 4 === 0) {
                    row = parseHTML('<div class="row"></div>');
                    galleryContainer.appendChild(row);
                }
            }
        }

        return galleryContainer;
    }
};

export { galleryRenderer };