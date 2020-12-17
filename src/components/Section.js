export default class Section {
    constructor(container) {
        this._container = document.querySelector(container);
        return this.addItem.bind(this);
    }

    addItem({items, renderer}) {
        items.forEach(item => {
            const card = renderer(item);
            this._container.prepend(card);
        })
    }
}