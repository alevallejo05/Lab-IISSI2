"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function showUser() {
    let title = document.getElementById("navbar-title");
    if (!title) return;

    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi, @" + username;
    } else {
        text = "Guest";
    }

    title.textContent = text;
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("navbar-logout");
    if (!logoutButton) return;

    logoutButton.onclick = function () {
        sessionManager.logout();
        window.location.href = "index.html";
    };
}

function hideHeaderOptions() {
    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerRecent = document.getElementById("navbar-recent");
    let headerCreate = document.getElementById("navbar-create");
    let headerTrending = document.getElementById("navbar-trending");

    if (!headerRegister) return;

    if (sessionManager.isLogged()) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
        headerTrending.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);