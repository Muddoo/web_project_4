import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector, eventTarget) {
        super(popupSelector);
        this._popup.querySelector('.popup__image').src = eventTarget.src;
        this._popup.querySelector('.popup__image').alt = eventTarget.alt;
        this._popup.querySelector('.popup__caption').textContent = eventTarget.alt;
        this.open()
    }
}