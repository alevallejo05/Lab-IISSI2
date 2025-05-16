/*
	C.Arévalo
	index.js.  Control de vista index.html, Mayo/2025
*/
"use strict";						// Nivel elevado de control de errores
import { messageRenderer } from '/js/renderers/messages.js'; // Renderizador de mensajes
import { photosAPI_auto } from './api/_photos.js'; // Controlador API de photos
import { photoswithtagsAPI_auto } from './api/_photoswithtags.js'; // Controlador API de la vista photosWithTags
import { photostagsAPI_auto } from "/js/api/_photostags.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";
import { tagsAPI_auto } from "/js/api/_tags.js"

async function main() {//Punto de entrada principal, haciéndolo asíncrono para poder llamar AJAX
	if (sessionManager.isLogged()) {
		changeHeader();

		document.addEventListener("submit", function (event) {
			if (event.target.classList.contains("add-form")) {
				handleAdd(event);
			}
		});
	}

	loadPhotos();

	document.addEventListener("click", function (event) {
		if (event.target.classList.contains("delete-btn")) {
			handleDelete(event);
		}
	});
}

async function loadPhotos() {
	try { // Acceso con éxito a las fotos
		let photos = await photosAPI_auto.getAll(); // Todos los pbjetos photo, tengan o no photoTags
		let photosTags = await photoswithtagsAPI_auto.getAll(); // photos con photoTags, incluyendo además datos de cada tag
		let tags = await tagsAPI_auto.getAll();

		let photoContainer = document.querySelector("#divGallery"); /* Contenedor para photos */
		photoContainer.innerHTML = "";
		let cardGallery = galleryRenderer.asCardGallery(photosTags, photos, tags);
		photoContainer.appendChild(cardGallery);
	}
	catch (err) { // Renderiza error
		console.log(err);
		messageRenderer.showErrorMessage(JSON.stringify(err.response.data));
	};
}

function changeHeader() {
	if (sessionManager.getLoggedUser().usernme === "root") {
		try {
			let titleContainer = document.getElementById("pageTitle");
			titleContainer.innerHTML = "Tags. Admin Management as 'root'";
		} catch (err) {
			messageRenderer.showErrorMessage("Error while changing title", err);
		}
	} else if (sessionManager.isLogged()) {
		try {
			let titleContainer = document.getElementById("pageTitle");
			titleContainer.innerHTML = "Tags. My Tags’ Management";
		} catch (err) {
			messageRenderer.showErrorMessage("Error while changing title", err);
		}
	}
}

async function handleDelete(event) {
	let answer = confirm("Do you really want to delete this add?");
	if (answer) {
		let photoTagId = event.target.getAttribute("photoTag-id");

		try {
			await photostagsAPI_auto.delete(photoTagId);
			loadPhotos();
		} catch (err) {
			messageRenderer.showErrorMessage("Error while deleting a tag", err);
		}
	}
}

async function handleAdd(event) {
	try {
		event.preventDefault();

		let form = event.target;
		let formData = new FormData(form);

		let select = form.querySelector("select[name='newTag']");
		let selectedOption = select.options[select.selectedIndex];
		let tagId = selectedOption.dataset.tagId;
		let photoId = form.dataset.photoId;

		formData.append("photoId", photoId);
		formData.append("tagId", tagId);

		await photostagsAPI_auto.create(formData);
		form.reset();
		loadPhotos();

	} catch (err) {
		messageRenderer.showErrorMessage("Error while adding a tag", err);
	}
}

document.addEventListener("DOMContentLoaded", main); // Manejador de eventos para documento cargado