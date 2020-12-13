export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _toggle() {
        this._popup.classList.toggle('visible');
    }

    _closePopup = (e) => {
        (e.target === this._popup || e.target === this._popup.querySelector('.popup__close')) && this.close();
    }

    _escHandler = (e) => {
        if(e.key === 'Escape') this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._closePopup);
        document.addEventListener('keydown', this._escHandler);   
    }

    removeEventListeners() {
        this._popup.removeEventListener('click', this._closePopup);
        document.removeEventListener('keydown', this._escHandler);   
    }

    open() {
        this.setEventListeners();
        this._toggle();
    }

    close() {
        this.removeEventListeners();
        document.activeElement.blur();
        this._toggle();
    }
}