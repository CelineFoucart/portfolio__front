
const Database = require('../src/helpers/Database.js');
const page = require('../__mocks__/page.js');
const document = page.window.document;

/**
 * @jest-environment jsdom
 */
describe("Database", () => {
    const data = [
        ["username", "John Doe"],
        ["mail", "john@doe.fr"]
    ];
    beforeEach(() => {
        const alerts = document.querySelectorAll('.alert-danger, .alert-success');
        if(alerts.length === 0) {
            return;
        }
        alerts.forEach(element => {
            element.remove();
        });
    });

    test("with valid data", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
                ok: true,
                status: 201
            })
        );
        const database = new Database(data, "http://website.com/contact");
        database.post(document).then(status => {
            expect(status).toBe(true);
        });
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("with invalid data", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve('{"username": "Ce champ est trop long"}'),
                ok: true,
                status: 400
            })
        );
        const database = new Database(data, "http://website.com/contact");
        database.post(document).then(status => {
            expect(status).toBe(false);
            const elementInformation = document.querySelector('.alert-danger');
            const message = document.querySelector('#message .alert-danger');
            expect(elementInformation).not.toBeNull();
            expect(message).not.toBeNull();
        });
    });

    test('with error and data not sent', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
                ok: false,
                status: 404
            })
        );
        const database = new Database(data, "http://website.com/contact");
        database.post(document).then(status => {
            expect(status).toBe(false);
            const message = document.querySelector('.alert-danger');
            const fieldMessage = document.querySelector('#message .alert-danger');
            expect(message).not.toBeNull();
            expect(message.innerHTML).toEqual("L'envoi a échoué.");
            expect(fieldMessage).toBeNull();
        });
    });
});