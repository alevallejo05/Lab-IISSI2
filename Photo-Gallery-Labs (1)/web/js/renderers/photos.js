"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
        <div class="card bg-dark text-light">
        <a href="photo_detail.html?photoId=${photo.photoId}">
        <img src="${photo.url}" class="card-img-top">
        </a>
        <div class="card-body">
        <h5 class="card-title text-center">${photo.title}</h5>
        <p class="card-text">${photo.description}</p>
        <p class="text-end">
        @${photo.username}
        <img src="${photo.avatarUrl}" style="width: 25px; height: 25px; border-radius: 50%; object-fit: cover;">
        </p>
        </div>
        </div>
        </div>`;

        let card = parseHTML(html);
        return card;
    },

    asDetails: function (photo) {
        let html = `<div class="photo-details">
        <h3>${photo.title}</h3>
        <h6>${photo.description}</h6>
        <p>Uploaded by <a href="user_profile.html" class="user-link">User ${photo.userId}
        </a> on ${photo.date}</p>
        <hr>
        <img src="${photo.url}" class="img-fluid">
        </div>`;

        let photoDetails = parseHTML(html);
        return photoDetails;
    },

    asComment: function (comment) {
        let html = `<li class="list-group-item">
        <div class="text-start fw-bold">
        @${comment.username}
        <img src="${comment.avatarUrl}" style="width: 25px; height: 25px; border-radius: 50%; object-fit: cover;">
        ${comment.date}
        </div>
        ${comment.text}
        <div class="text-end">
        <button class="btn btn-danger delete-comment-btn" data-comment-id="${comment.commentId}">Delete</button>
        </div>
        </li>`;

        let photoComment = parseHTML(html);
        return photoComment;
    }
};

export { photoRenderer };