"use strict";

import { albumsAPI_auto } from "/js/api/_albums.js";
import { albumValidator } from "/js/validators/album.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let albumId = urlParams.get("albumId");
let currentAlbum = null;

function main() {
    if (albumId !== null) {
        loadCurrentAlbum();
    }

    let createForm = document.getElementById("create-form");
    createForm.onsubmit = handleCreate;
}

async function handleCreate(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errors = albumValidator.validateAlbum(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        if (currentAlbum === null) {
            formData.append("userId", 1);

            try {
                await albumsAPI_auto.create(formData);
                window.location.href = "index.html";
            } catch {
                messageRenderer.showErrorMessage("Error while adding an album", err);
            }
        } else {
            formData.append("userId", currentAlbum.userId);

            try {
                await albumsAPI_auto.update(formData, albumId);
                window.location.href = "index.html";
            } catch (err) {
                messageRenderer.showErrorMessage("Error while editing an album", err);
            }
        }
    }
}

async function loadCurrentAlbum() {

    let pageTitle = document.getElementById("page-title");
    let title = document.getElementById("title-input");
    let artist = document.getElementById("artist-input");
    let date = document.getElementById("date-input");
    let url = document.getElementById("url-input");
    let tracks = document.getElementById("tracks-input");

    pageTitle.textContent = "Editing an album";

    try {
        currentAlbum = await albumsAPI_auto.getById(albumId);
        title.value = currentAlbum.title;
        artist.value = currentAlbum.artist;
        date.value = currentAlbum.releaseDate;
        url.value = currentAlbum.imageUrl;
        tracks.value = currentAlbum.numTracks;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);