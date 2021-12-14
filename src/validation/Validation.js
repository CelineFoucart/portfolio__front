class Validation {

    /**
     * 
     * @param {array} data - array of form values
     */
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    /**
     * 
     * @param {int} key
     * @param {int} max = 20
     */
    maxLength(key, fieldId, max = 20) {
        const value = this.data[key];
        if(value.length > max) {
            this.errors.push([fieldId, "Ce champ est trop long"]);
        }
    }

    minLength(key, fieldId, min = 20) {
        const value = this.data[key];
        if(value.length < min) {
            this.errors.push([fieldId, "Ce champ est trop court"]);
        }
    }

    /**
     * 
     * @param {int} key 
     */
    email(key, fieldId) {
        const value = this.data[key];
        const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
        if(!regex.test(value)) {
            this.errors.push([fieldId, "Ce champ n'est pas un email"]);
        }
    }
}

module.exports = Validation;

