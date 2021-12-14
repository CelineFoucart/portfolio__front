export class FormatErrors {

    /**
     * 
     * @param {array} errors
     */
    constructor(errors) {
        this.errors = errors;
    }

    appendMessage()
    {
        if(this.errors.length === 0) {
            return false;
        }
        for (let index = 0; index < this.errors.length; index++) {
            const id = this.errors[index][0];
            const field = document.querySelector('#' + id);
            const error = this.createErrorElement(this.errors[index][1]);
            field.parentElement.appendChild(error);
        }
        return true;
    }

    createErrorElement(message)
    {
        const div = document.createElement('div');
        div.classList.add('alert-danger');
        div.innerText = message;
        return div;
    }


}