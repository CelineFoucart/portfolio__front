const Validation = require('../src/validation/Validation.js');

describe('Validation', () => {
    test('No error email', () => {  
        const data = [
            'johndoe@email.fr'
        ];
        const validator = new Validation(data);
        validator.email(0, 'email');
        const errors = validator.errors;
        expect(errors).toEqual([]);
    });

    test('Error email', () => {  
        const data = [
            'johndoe'
        ];
        const validator = new Validation(data);
        validator.email(0, 'email');
        const errors = validator.errors;
        expect(errors[0]).toEqual(["email", "Ce champ n'est pas un email"]);
    });

    test('No error min length', () => {  
        const data = [
            'John Doe'
        ];
        const validator = new Validation(data);
        validator.minLength(0, 'username', 4);
        const errors = validator.errors;
        expect(errors).toEqual([]);
    });

    test('Error min length', () => {  
        const data = [
            'J'
        ];
        const validator = new Validation(data);
        validator.minLength(0, 'username', 4);
        const errors = validator.errors;
        expect(errors[0]).toEqual(['username', "Ce champ est trop court"]);
    });

    test('No error max length', () => {  
        const data = [
            'John Doe'
        ];
        const validator = new Validation(data);
        validator.maxLength(0, 'username');
        const errors = validator.errors;
        expect(errors).toEqual([]);
    });

    test('Max length error', () => {
        const data = [
            'azazaaaaaaaaaaaaaaaaaaaaaazeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrreeeeeeeeeeeeeee'
        ];
        const validator = new Validation(data);
        validator.maxLength(0, 'username');
        const errors = validator.errors;
        expect(errors[0]).toEqual(["username", "Ce champ est trop long"]);
    });
});