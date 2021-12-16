class FormatErrors {

    /**
     * 
     * @param {array} errors
     */
    constructor(errors) {
        this.errors = errors;
    }

    appendMessage(document)
    {
        if(this.errors.length === 0) {
            return false;
        }
        for (let index = 0; index < this.errors.length; index++) {
            const id = this.errors[index][0];
            const field = document.querySelector('#' + id);

            const error = document.createElement('div');
            error.classList.add('alert-danger');
            error.innerHTML = this.errors[index][1];
            field.parentElement.appendChild(error, document);
        }
        return true;
    }
}

module.exports = FormatErrors;