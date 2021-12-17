const submit = require('../src/submit.js');
const page = require('../__mocks__/page.js');
const document = page.window.document;
const DataHelper = require('./helpers/DataHelper.js');

/**
 * @jest-environment jsdom
 */
describe("Submit", () => {
    beforeEach(() => {
        const alerts = document.querySelectorAll('.alert-danger, .alert-success');
        if(alerts.length === 0) {
            return;
        }
        alerts.forEach(element => {
            element.remove();
        });
    });

    test('valid data', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
                ok: true,
                status: 201
            })
        );
        DataHelper.insertValues(DataHelper.validValues(), document);

        submit(document).then(status => {
            expect(status).toBe(true);
            const success = document.querySelector('.alert-success');
            expect(success).not.toBeNull();
        });
    });

    test("invalid data", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve('{"email": "john", "subject":"l"}'),
                ok: true,
                status: 400
            })
        );
        DataHelper.insertValues(DataHelper.invalidValues(), document);
        const status = submit(document);
        const success = document.querySelector('.alert-danger');
        expect(status).toBe(false);
        expect(success).not.toBeNull();
    });
});