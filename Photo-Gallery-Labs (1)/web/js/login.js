"use strict"

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI_auto } from "/js/api/_auth.js";

function main() {
    let LoginForm = document.getElementById("login-form");
    LoginForm.onsubmit = handleLogin;
}

async function handleLogin(event) {

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    try {
        let loginForm = await authAPI_auto.login(formData);
        let sessionToken = loginForm.sessionToken;
        let loggedUser = loginForm.user;
        
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
    } catch (err) {
        messageRenderer.showErrorMessage("Login failed", err);
    }
}

document.addEventListener("DOMContentLoaded", main);