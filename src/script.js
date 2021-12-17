const submit = require('../src/submit.js');
const ScrollObserver = require('../src/ScrollObserver.js');

window.onload = () => {
    const scrollObserver = new ScrollObserver();
    scrollObserver.run();

    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        submit(document);
    });
}

