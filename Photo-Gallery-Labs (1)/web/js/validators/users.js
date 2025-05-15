"use strict";

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");

        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("The first and last name should have more than 3 characters");
        }
        
        return errors;
    }
};

export { userValidator };