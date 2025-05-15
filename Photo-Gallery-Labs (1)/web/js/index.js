"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photoswithusersAPI_auto } from "/js/api/_photoswithusers.js";

async function main() {
    loadAllPhotos();
}

async function loadAllPhotos() {
    try {
        let galleryContainer = document.getElementById("gallery");
        let photos = await photoswithusersAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(photos);
        
        galleryContainer.appendChild(cardGallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }
}

document.addEventListener("DOMContentLoaded", main);