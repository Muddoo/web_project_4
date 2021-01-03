export default class Section {
    constructor({items, renderer},container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    add(item) {
        this._container.prepend(this._renderer(item))
    }

    addAll() {
        this._items.forEach(item => {
            const card = this._renderer(item);
            this._container.append(card);
        })
    }
}