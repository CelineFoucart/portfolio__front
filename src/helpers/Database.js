const FormatErrors = require("./FormatErrors");

class Database {

    constructor(data, url) {
        this.data = data;
        this.url = url;
    }

    async post(document) {
        const message = document.querySelector("#message");
        message.innerHTML = "Envoi en cours";
        try {
            return await fetch(this.url, {
                method: 'POST',
                body: JSON.stringify(this.data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then((response) => {
                this.manageResponse(response, message);
                return response.json();
            }).then((json) => {
                if(json === {}) {
                    return true;
                }
                const format = new FormatErrors(json);
                format.appendMessage(document);
                return false;
            });
        } catch(e) {
            this.getError(message);
            return false;
        }
    }

    manageResponse(response, message) {
        const alert = document.createElement('p');
        message.innerHTML = "";
        if(response.status === 201) {
            alert.classList.add('alert-success');
            alert.innerHTML = "Le message a bien été envoyé.";
        } else {
            alert.classList.add('alert-danger');
            alert.innerHTML = "L'envoi a échoué.";
        }
        message.appendChild(alert);
    }

    getError(message) {
        message.classList.add('alert-danger');
        message.innerHTML = "Il y a eu une erreur";
    }
}

module.exports = Database;