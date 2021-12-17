
class DataHelper {

    static validValues() {
        return {
            username: "John Doe",
            email: "john@email.fr",
            subject: "lorem ispum",
            content: "lorem ipsum sit amet dolorem nihil sicut et non"
        }
    }

    static invalidValues() {
        const valid = this.validValues();
        valid.email = "john";
        valid.subject = "l";
        return valid;
    }

    static insertValues(values, document) {
        for (const property in values) {
            document.querySelector('#' + property).value = values[property];
        }
    }
}

module.exports = DataHelper;