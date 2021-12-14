const Selector = require('../src/helpers/Selector.js');
const page = require('./__mocks__/page.js');



/**
 * @jest-environment jsdom
 */
describe('Selector', () => {
    const element = page.window.document.createElement('div');
    expect(element).not.toBeNull();
});