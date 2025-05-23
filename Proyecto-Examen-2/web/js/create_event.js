"use strict";

import { eventsAPI_auto } from "/js/api/_events.js";
import { eventValidator } from "/js/validators/event.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let eventId = urlParams.get("eventId");
let currentEvent = null;

function main() {

    if (eventId !== null) {
        loadCurrentEvent();
    }

    let createForm = document.getElementById("create-form");
    createForm.onsubmit = handleCreate;
}

async function handleCreate(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errors = eventValidator.validateEvent(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        if (currentEvent === null) {
            try {
                await eventsAPI_auto.create(formData);
                window.location.href = "index.html";
            } catch {
                messageRenderer.showErrorMessage("Error while adding an event", err);
            }
        } else {
            try {
                await eventsAPI_auto.update(formData, eventId);
                window.location.href = "index.html";
            } catch (err) {
                messageRenderer.showErrorMessage("Error while editing an event", err);
            }
        }
    }
}

async function loadCurrentEvent() {

    let pageTitle = document.getElementById("page-title");
    let userIdInput = document.getElementById("user-id-input");
    let nameInput = document.getElementById("name-input");
    let dateInput = document.getElementById("date-input");
    let maxParticipantsInput = document.getElementById("max-participants-input");
    let placeInput = document.getElementById("place-input");
    let urlInput = document.getElementById("url-input");

    pageTitle.textContent = "Editing an event";

    try {
        currentEvent = await eventsAPI_auto.getById(eventId);
        userIdInput.value = currentEvent.userId;
        nameInput.value = currentEvent.name;
        dateInput.value = currentEvent.eventDate;
        maxParticipantsInput.value = currentEvent.maxParticipants;
        placeInput.value = currentEvent.place;
        urlInput.value = currentEvent.imageUrl;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);