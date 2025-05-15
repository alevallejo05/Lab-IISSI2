"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { commentswithusersAPI_auto } from "/js/api/_commentswithusers.js";
import {commentsAPI_auto} from "/js/api/_comments.js"

// Get the ID of the photo to load from the URL params
let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function main() {
    // Check that we have an ID before doing anything else
    if (photoId === null) {
        messageRenderer.showErrorMessage("Please, provide a photoId");
        return;
    }

    loadPhotoDetails();
    loadPhotoComments();

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;

    let commentForm = document.getElementById("comment-form");
    commentForm.onsubmit = handleAddComment;

    const commentsContainer = document.querySelector("#comments");
    commentsContainer.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("delete-comment-btn")) {
            handleDeleteComment(event);
        }
    });

    hideActionsColumn();
}

async function loadPhotoDetails() {
    let photoContainer = document.querySelector("#photo-details-column");

    try {
        let photo = await photosAPI_auto.getById(photoId)

        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (err) {
        messageRenderer.showErrorMessage("Error loading photo", err);
    }
}

async function loadPhotoComments() {
    try {
        let photoContainer = document.querySelector("#comments");
        photoContainer.innerHTML = "";

        const comments = await commentswithusersAPI_auto.getAll();
        const commentsfilter = comments.filter(c => c.photoId == photoId);

        for (let com of commentsfilter) {
            let comment = photoRenderer.asComment(com);
            photoContainer.appendChild(comment);

            if (!sessionManager.isLogged() || sessionManager.getLoggedId() !== com.userId) {
                let delete_btn = comment.querySelector(".delete-comment-btn");
                delete_btn.style.display = "none";
            }
        }
    } catch(err) {
        messageRenderer.showErrorMessage("Error while loading comments", err);
    }
}

async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo?");

    if (answer) {
        try {
            await photosAPI_auto.delete(photoId);
            window.location = "/index.html";
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

async function handleAddComment(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedUser().userId);
    formData.append("photoId", photoId);

    await commentsAPI_auto.create(formData);
    form.reset();
    loadPhotoComments();
}

async function handleDeleteComment(event) {
    let answer = confirm("Do you really want to delete this comment?");

    if (answer) {
        let button = event.target;
        let commentId = button.dataset.commentId;

        try {
            await commentsAPI_auto.delete(commentId);
            loadPhotoComments();
        } catch (err) {
            messageRenderer.showErrorMessage("Error while deleting comment", err);
        }
    }
}

function hideActionsColumn() {
    let actions_col = document.getElementById("actions-col");
    
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);