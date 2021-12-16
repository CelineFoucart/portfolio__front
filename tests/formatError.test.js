const FormatErrors = require('../src/helpers/FormatErrors.js');
const page = require('../__mocks__/page.js');
const document = page.window.document;

/**
 * @jest-environment jsdom
 */
describe("Test FormatError", () => {
    beforeEach(() => {
        const alerts = document.querySelectorAll('.alert-danger');
        if(alerts.length === 0) {
            return;
        }
        alerts.forEach(element => {
            element.remove();
        });
    });

    test("with data", () => {
        const errors = [
            ["username", "Ce champ est trop long"]
        ];
        const format = new FormatErrors(errors);
        format.appendMessage(document);
    
        let elementError = document.querySelector('#username + .alert-danger');
        expect(elementError).not.toBeNull();
        expect(elementError.innerHTML).toEqual(errors[0][1]);
    });
});