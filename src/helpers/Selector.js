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