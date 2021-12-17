class FormatErrors {

    constructor(errors) {
        this.errors = errors;
    }

    appendMessage(document) {
        if(Array.isArray(this.errors)) {
            return this.appendErrorsWithArray(document);
        } else {
            return this.appendErrorsWithObject(document);
        }
    }

    appendErrorsWithObject(document) {
        if(Object.keys(this.errors).length === 0) {
            return false;
        }
        for (const property in this.errors) {
            this.createField(property, this.errors[property], document);
        }
        return true;
    }

    appendErrorsWithArray(document) {
        document.querySelectorAll('.alert-danger').forEach(element => {
            element.remove();
        });

        if(this.errors.length === 0) {
            return false;
        }
        for (let index = 0; index < this.errors.length; index++) {
            const id = this.errors[index][0];
            const message = this.errors[index][1];
            this.createField(id, message, document);
        }
        return true;
    }

    createField(id, message, document) {
        const field = document.querySelector('#' + id);
        const error = document.createElement('div');
        error.classList.add('alert-danger');
        error.innerHTML = message;
        field.parentElement.appendChild(error, document);
    }
}

module.exports = FormatErrors;