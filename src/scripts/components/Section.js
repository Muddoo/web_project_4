export default class Section {
    constructor({items,renderer},container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
        this._addItem();
    }

    _addItem() {
        this._items.forEach(item => {
            const card = this._renderer(item);
            this._container.append(card);
        })
    }
}