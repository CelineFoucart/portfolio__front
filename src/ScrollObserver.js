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