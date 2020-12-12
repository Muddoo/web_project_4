import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {array = [],submit}) {
        super(popupSelector);
        this._array = array;
        this._submitForm = submit;
        this.open();
    }
    
    _handleSubmit = (e) => {
        e.preventDefault();
        this._submitForm();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleSubmit);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._popup.removeEventListener('submit', this._handleSubmit);
    }

    open() {
        super.open();
        this._popup.querySelector('.popup__field').focus();
        this._popup.querySelectorAll('.popup__field').forEach((input,i) => (input.value = document.querySelector(this._array[i])?.textContent || ''));
        this._popup.querySelector('.popup__submit').classList.add('inactive');
        this._popup.querySelector('.popup__submit').disabled = true;
    }
}