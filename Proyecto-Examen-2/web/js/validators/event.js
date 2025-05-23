"use strict";

const eventValidator = {
    validateEvent: function (formData) {
        let errors = [];

        let name = formData.get("name");
        let place = formData.get("place");
        let maxParticipants = formData.get("maxParticipants");

        if (name.length < 3) {
            errors.push("Nombre corto");
        }
        if (name.length === place.length) {
            errors.push("Misma longitud");
        }
        if (maxParticipants < 2 || maxParticipants > 2000) {
            errors.push("Pocos o muchos participantes");
        }

        return errors;
    }
};

export { eventValidator };