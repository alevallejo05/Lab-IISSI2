/*
	C.Arévalo, Mayo/2025
	photos.js.  Renderización de Fotos y photosTags (Solución de partida, en bruto)
*/
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; // Crea elementos del DOM a partir de fuente html
const photoRenderer = {
	asCard: function (photo, photosTags) { // Renderiza un objeto photo como card y a continuación todos sus photoTags como texto en bruto
		let thisPhoto_photosTags = photosTags.filter(item => item.photoId == photo.photoId); // Extrae photoTags del objeto photo renderizado en cada card

		let htmlTags = ``;
		for (let photoTtag of thisPhoto_photosTags) {
			htmlTags += ` <label id="tagBox" class="badge bg-secondary"> 
				<label id="tagIdBox" class="badge rounded-pill bg-light text-dark">
				${photoTtag.tagId}
				</label>
				${photoTtag.name}
				</label> `;
		}

		let html = `<div class="card col-sm-3 p-1 mb-1 text-center">
					<h5>#${photo.photoId} ${photo.title}</h5>
					<h7>${photo.visibility}</h7>
					<img src="${photo.url}" class="img-fluid w-100">
					<p class="text-start">${htmlTags}</p>
				`;

		return parseHTML(html);
	},

	asCardAdmin: function (photo, photosTags, tags) {
		let thisPhoto_photosTags = photosTags.filter(item => item.photoId == photo.photoId);

		let htmlTags = ``;
		let options = ``;
		let newTags = [];
		if (thisPhoto_photosTags.length > 0) {
			let oldTags = thisPhoto_photosTags.map(item => item.tagId);

			for (let thisPhotoTag of thisPhoto_photosTags) {
				for (let tag of tags) {

					if (thisPhotoTag.tagId === tag.tagId) {
						htmlTags += `<button class="btn btn-danger delete-btn m-1" photoTag-id="${thisPhotoTag.photoTagId}">${thisPhotoTag.name}</button>`;
					} else if (!newTags.includes(tag.name) && !oldTags.includes(tag.tagId)) {
						newTags.push(tag.name);
						options += `<option data-tag-id="${tag.tagId}">${tag.name}</option>`;
					}
				}
			}
		} else {
			for (let tag of tags) {

				if (!newTags.includes(tag.name)) {
					newTags.push(tag.name);
					options += `<option data-tag-id="${tag.tagId}">${tag.name}</option>`;
				}
			}
		}

		htmlTags += `<form class="add-form" data-photo-id="${photo.photoId}">
			<select name="newTag" id="new-tag">${options}</select>
			<div class="text-center">
			<button type= "submit" class="btn btn-primary add-btn mt-3"> Add </button>
			</div>
			</form>`;

		let html = `<div class="card col-sm-3 p-1 mb-1 text-center">
					<h5>#${photo.photoId} ${photo.title}</h5>
					<h7>${photo.visibility}</h7>
					<img src="${photo.url}" class="img-fluid w-100">
					<p class="text-start">${htmlTags}</p>
				`;

		return parseHTML(html);
	}
};

export { photoRenderer };