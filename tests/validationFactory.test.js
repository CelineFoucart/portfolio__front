const validationFactory = require('../src/validation/ValidationFactory.js');

describe('Validation Factory', () => {
    test("No error", () => {
        const data = [
            'John Doe',
            'johndoe@email.fr',
            'Besoin d \'aide sur un bug',
            'lorem ipsum sit amet consequentur nihil sicut et dominus'
        ];
        const errors = validationFactory(data);
        expect(errors).toEqual([]);
    });

    test("With errors", () => {
        const data = [
            'J',
            'jo',
            'B',
            'lorem ipsum sit amet consequentur nihil sicut et dominus'
        ];
        const errors = validationFactory(data);
        expect(errors[0][0]).toEqual("username");
        expect(errors[1][0]).toEqual("email");
        expect(errors[2][0]).toEqual("subject");
    });
});