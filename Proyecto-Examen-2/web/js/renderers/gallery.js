"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { eventRenderer } from "/js/renderers/event.js";

const galleryRenderer = {
    asCardGallery: function (events) {
        let galleryContainer = parseHTML('<div class="event-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);

        for (let event of events) {
            if (event.userId === 1) {
                let card = eventRenderer.asCard(event);
                row.appendChild(card);
            }
        }

        return galleryContainer;
    }
};

export { galleryRenderer };