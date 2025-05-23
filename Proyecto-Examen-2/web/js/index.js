"use strict";

import { eventswithusersAPI_auto } from "/js/api/_eventswithusers.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery.js";

function main() {
    loadEvents();

    let createBtn = document.querySelector("#create-button");
    createBtn.onclick = handleCreate;
}

async function loadEvents() {
    try {
        let container = document.getElementById("content");
        let events = await eventswithusersAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(events);
        
        container.appendChild(cardGallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading events", err);
    }
}

async function handleCreate() {
    window.location.href = "create_event.html";
}

document.addEventListener("DOMContentLoaded", main);