
class IndexObserver {

    constructor(threshold, rootMargin, selectorValue, activeClass) {
        this.options = {
            rootMargin: rootMargin,
            threshold: threshold
        };
        this.entries = document.querySelectorAll(selectorValue);
        this.activeClass = activeClass;
    }

    observe() {
        const entries = this.entries;
        const options = this.options;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.intersectionRatio > 0) {
                    this.activate(entry.target);
                }
            });
        }, options);
        entries.forEach(entry => { 
            observer.observe(entry);
        });
    }

    activate() {
        const id = element.id;
        const anchor = document.querySelector(`a[href="#${id}"]`);
        if (anchor === null) {
            return null;
        }
        anchor.parentElement.parentElement
        .querySelectorAll('.'+ this.activeClass)
        .forEach(node => {
            node.classList.remove(this.activeClass);
        });
        anchor.classList.add(this.activeClass);
    }

}