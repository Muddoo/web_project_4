import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');
        this.setEventListeners();
        return this.open.bind(this);
    }

    open(e) {
        super.open();
        this._image.src = e.target.src;
        this._image.alt = e.target.alt;
        this._caption.textContent = e.target.alt;
    }
}