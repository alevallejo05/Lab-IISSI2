"use strict";

import { albumswithusersAPI_auto } from "/js/api/_albumswithusers.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery.js";

function main() {
    loadAlbums();

    let createBtn = document.querySelector("#create-button");
    createBtn.onclick = handleCreate;

    document.addEventListener("click", function (event) {
		if (event.target.classList.contains("btn")) {
			handleEdit(event);
		}
	});
}

async function loadAlbums() {
    try {
        let container = document.getElementById("content");
        let albums = await albumswithusersAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(albums);
        
        container.appendChild(cardGallery);
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading albums", err);
    }
}

async function handleCreate() {
    window.location.href = "create_album.html";
}

async function handleEdit(event) {
    let albumId = event.target.id;
    window.location.href = "create_album.html?albumId=" + albumId;
}

document.addEventListener("DOMContentLoaded", main);