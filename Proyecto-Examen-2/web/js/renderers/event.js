"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const eventRenderer = {
    asCard: function (eventWithUsers) {
        let html =
            `<div class="row mt-3">
            <div class="col-md-3 text-center">
                <img src="${eventWithUsers.imageUrl}" class="event-img">
                <a href="create_event.html?eventId=${eventWithUsers.eventId}">
                    <button class="btn btn-primary mt-2">Edit Event</button>
                </a>
            </div>

            <div class="col-md-3 text-center">
                <p>${eventWithUsers.name}</p>
            </div>

            <div class="col-md-3 text-center">
                <p>${eventWithUsers.username}
                <img src="${eventWithUsers.avatarUrl}" class="photo-user-avatar">
                </p>
            </div>

            <div class="col-md-3 text-center">
                <p>${eventWithUsers.place}</p>
            </div>
        </div>`;

        let card = parseHTML(html);
        return card;
    }
}

export { eventRenderer };