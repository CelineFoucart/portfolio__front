import { Selector } from './helpers/Selector.js';
import { FormatErrors } from './helpers/FormatErrors.js';
import { validationFactory } from './validation/ValidationFactory.js';

window.onload = () => {
    const selector = new Selector('username', 'email', 'subject', 'content');
    selector.selectValue();
    const data = selector.data;
    const errors = validationFactory(data);
    if(errors.length === 0) {
        // send to server
    } else {
        const format = new FormatErrors(errors);
        format.appendMessage();
    }
}

