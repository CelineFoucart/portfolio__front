const Validation = require('../validation/Validation.js');

function validationFactory(data) {
    const validation = new Validation(data);
    validation.minLength(0, 'username', 5);
    validation.email(1, 'email');
    validation.minLength(2, 'subject', 5);
    validation.minLength(3, 'content', 20);
    return validation.errors;
}

module.exports = validationFactory;
