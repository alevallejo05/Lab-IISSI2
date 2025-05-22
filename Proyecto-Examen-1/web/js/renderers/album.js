"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const albumRenderer = {
    asCard: function (albumwithuser) {
        let html = 
        `<div class="row mt-3">
            <div class="col-3 text-center">
                <img src="${albumwithuser.imageUrl}" class="img-fluid">
                <button id="${albumwithuser.albumId}" class="btn btn-primary mt-3">Edit this album</button>
            </div>

            <div class="col-3 text-center">
                <p>${albumwithuser.username}</p>
            </div>

            <div class="col-3 text-center">
                <p>${albumwithuser.artist}</p>
            </div>

            <div class="col-3 text-center">
                <p>${albumwithuser.title}</p>
            </div>
        </div>`;

        let card = parseHTML(html);
        return card;
    }
}

export { albumRenderer };