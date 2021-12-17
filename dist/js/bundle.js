/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ScrollObserver.js":
/*!*******************************!*\
  !*** ./src/ScrollObserver.js ***!
  \*******************************/
/***/ ((module) => {

class ScrollObserver {

	constructor(selectorValue = '[data-spy="scoll"]', activeClass = 'active', ratio = .6) {
		this.ratio = ratio;
		this.entries = document.querySelectorAll(selectorValue);
        this.activeClass = activeClass;
        this.calculOptions();
        this.observer = null;
	}

	calculOptions() {
		const y = Math.round(window.innerHeight * this.ratio);
        this.options = {
        	rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
        }
	}

	/**
	 * @param {HTMLElement} element 
	 */
	activate(element) {
	    const id = element.id;
	    const anchor = document.querySelector(`a[href="#${id}"]`);
	    if (anchor === null) {
	        return null;
	    }
	    anchor.parentElement.parentElement.querySelectorAll('.'+ this.activeClass).forEach(node => {
	        node.classList.remove(this.activeClass);
	    });
	    anchor.classList.add(this.activeClass);
	}
	
	observe() {
		if(this.observer !== null) {
	        this.entries.forEach(entry => observer.unobserve(entry));
	    }
	    this.calculOptions();
	    const entries = this.entries;
        this.observer = new IntersectionObserver((entries) => {
        	entries.forEach((entry) => {
	            if(entry.intersectionRatio > 0) {
	                this.activate(entry.target);
	        	}
			});
        }, this.options);
        this.entries.forEach(entry => { 
            this.observer.observe(entry);
        });
        this.entries.forEach(entry => this.observer.observe(entry));
    }

    /**
	 * @param   {function} callback
	 * @param   {number}   delay 
	 * @returns {function}
	 */
    debounce(callback, delay) {
    	let timer;
	    return function () {
	        let args = arguments;
	        let context = this;
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	            callback.apply(context, args);
	        }, delay)
	    }
    }

    run() {
    	if(this.entries.length > 0) {
		    this.observe();
		    let WindowH = window.innerHeight;
		    window.addEventListener('resize', this.debounce(() => {
		        if (window.innerHeight !== WindowH) {
		            this.observe();
		            WindowH = window.innerHeight;
		        }
		    }, 500));
		}
    }
}

module.exports = ScrollObserver;

/***/ }),

/***/ "./src/helpers/Database.js":
/*!*********************************!*\
  !*** ./src/helpers/Database.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const FormatErrors = __webpack_require__(/*! ./FormatErrors */ "./src/helpers/FormatErrors.js");

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

/***/ }),

/***/ "./src/helpers/FormatErrors.js":
/*!*************************************!*\
  !*** ./src/helpers/FormatErrors.js ***!
  \*************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./src/helpers/Selector.js":
/*!*********************************!*\
  !*** ./src/helpers/Selector.js ***!
  \*********************************/
/***/ ((module) => {

class Selector {
    
    constructor(...ids) {
        this.ids = ids;
        this.data = [];
    }

    selectValue(document) {
        try {
            for (let index = 0; index < this.ids.length; index++) {
                const id = this.ids[index];
                const value = document.querySelector('#' + id).value;
                this.data.push(value);
            } 
        } catch (error) {
            throw new TypeError("This ids of array Selector.ids does not exist in this page!");
        }
        
    }
}

module.exports = Selector;

/***/ }),

/***/ "./src/submit.js":
/*!***********************!*\
  !*** ./src/submit.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Selector = __webpack_require__(/*! ../src/helpers/Selector.js */ "./src/helpers/Selector.js");
const FormatErrors = __webpack_require__(/*! ./helpers/FormatErrors.js */ "./src/helpers/FormatErrors.js");
const validationFactory = __webpack_require__(/*! ./validation/ValidationFactory.js */ "./src/validation/ValidationFactory.js");
const Database = __webpack_require__(/*! ./helpers/Database.js */ "./src/helpers/Database.js");

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

/***/ }),

/***/ "./src/validation/Validation.js":
/*!**************************************!*\
  !*** ./src/validation/Validation.js ***!
  \**************************************/
/***/ ((module) => {

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



/***/ }),

/***/ "./src/validation/ValidationFactory.js":
/*!*********************************************!*\
  !*** ./src/validation/ValidationFactory.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Validation = __webpack_require__(/*! ../validation/Validation.js */ "./src/validation/Validation.js");

function validationFactory(data) {
    const validation = new Validation(data);
    validation.minLength(0, 'username', 5);
    validation.email(1, 'email');
    validation.minLength(2, 'subject', 5);
    validation.minLength(3, 'content', 20);
    return validation.errors;
}

module.exports = validationFactory;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
const submit = __webpack_require__(/*! ../src/submit.js */ "./src/submit.js");
const ScrollObserver = __webpack_require__(/*! ../src/ScrollObserver.js */ "./src/ScrollObserver.js");
window.onload = () => {
    const scrollObserver = new ScrollObserver();
    scrollObserver.run();

    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        submit(document);
    });
}


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map