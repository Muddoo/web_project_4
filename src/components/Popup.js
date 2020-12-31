export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _toggle() {
        this._popup.classList.toggle('visible');
    }

    _closePopup = (e) => {
        (e.target === this._popup || e.target === this._popup.querySelector('.popup__close')) && this.close();
    }

    _handleKeyPress(e) {
        if(e.key === 'Escape') this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._closePopup);   
    }

    open() {
        document.activeElement.blur();
        document.addEventListener('keydown', this._handleKeyPress);  
        this._toggle();
    }

    close() {
        document.removeEventListener('keydown', this._handleKeyPress); 
        document.activeElement.blur();
        this._toggle();
    }
}