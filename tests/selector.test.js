const Selector = require('../src/helpers/Selector.js');
const page = require('../__mocks__/page.js');
const document = page.window.document;

/**
 * @jest-environment jsdom
 */
describe('Selector with errors', () => {
    const errorMessage = "This ids of array Selector.ids does not exist in this page!";

    test("with valid ids and empty data", () => {
        const selector = new Selector('username', 'email', 'subject', 'content');
        selector.selectValue(document);
        const data = selector.data;
        expect(data.length).toBe(4);
        expect(data[0]).toEqual("");
    });

    test("with invalid id", () => {
        try {
            const selector = new Selector('user', 'email');
            selector.selectValue(document); 
        } catch (error) {
            expect(error.message).toBe(errorMessage);
            expect(error.name).toBe("TypeError");
        }
    });
});

/**
 * @jest-environment jsdom
 */
describe("Test Selector with data", () => {
    const values = {
        username: "John Doe",
        email: "john@email.fr",
        subject: "lorem ispum",
        content: "lorem ipsum sit amet dolorem nihil sicut et non"
    };

    test("test with valid data", () => {
        for (const property in values) {
            document.querySelector('#' + property).value = values[property];
        }

        const selector = new Selector('username', 'email', 'subject', 'content');
        selector.selectValue(document);
        const data = selector.data;
        expect(data.length).toBe(4);
        expect(data[0]).toEqual(values.username);
        expect(data[1]).toEqual(values.email);
        expect(data[2]).toEqual(values.subject);
        expect(data[3]).toEqual(values.content);
    });
});