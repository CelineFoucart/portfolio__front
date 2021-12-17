const Selector = require('../src/helpers/Selector.js');
const FormatErrors = require('./helpers/FormatErrors.js');
const validationFactory = require('./validation/ValidationFactory.js');
const Database = require('./helpers/Database.js');

function submit (document) {
    const selector = new Selector('username', 'email', 'subject', 'content');
    selector.selectValue(document);
    const data = selector.data;
    const errors = validationFactory(data);
    if(errors.length === 0) {
        const database = new Database(data, '/contact');
        return database.post(document);
    } else {
        const format = new FormatErrors(errors);
        format.appendMessage(document);
        return false;
    }
}

module.exports = submit;