"use strict";

const albumValidator = {
    validateAlbum: function (formData) {
        let errors = [];

        let title = formData.get("title");
        let artist = formData.get("artist");
        let numTracks = formData.get("numTracks");

        if (title.length < 3 || title.length === artist.length || numTracks < 0 || numTracks > 20) {
            errors.push("Error while adding an album");
        }
        
        return errors;
    }
};

export { albumValidator };