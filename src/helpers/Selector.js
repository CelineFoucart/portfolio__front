class Selector {
    
    constructor(...ids) {
        this.ids = ids;
        this.data = [];
    }

    selectValue() {
        for (let index = 0; index < this.ids.length; index++) {
            const id = this.ids[index];
            const value = document.querySelector('#' + id).value;
            this.data.push(value);
        }
    }
}

module.exports = Selector;