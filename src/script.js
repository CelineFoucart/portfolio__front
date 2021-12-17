const submit = require('../src/submit.js');
window.onload = () => {

    // scrollspy
    const options = {
        rootMargin: "0px",
        threshold: 0.5
    };

    const indexObserver = new IndexObserver(0.5, "0px", '[data-spy="scoll"]', 'active');

    const entries = document.querySelectorAll('[data-spy="scoll"]');
    const activate = (element) => {
        const id = element.id;
        const anchor = document.querySelector(`a[href="#${id}"]`);
        if (anchor === null) {
            return null;
        }
        anchor.parentElement.parentElement.querySelectorAll('.active').forEach(node => {
            node.classList.remove('active');
        });
        anchor.classList.add('active');
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.intersectionRatio > 0) {
                activate(entry.target);
            }
        });
    }, options);
    entries.forEach(entry => { 
        observer.observe(entry);
    });


    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        submit(document);
    });
}

