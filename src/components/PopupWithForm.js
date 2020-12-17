import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {info,submit}) {
        super(popupSelector);
        this._input = this._popup.querySelector('.popup__field');
        this._inputs = this._popup.querySelectorAll('.popup__field');
        this._info = info;
        this._submitForm = submit;
        this._submitButton = this._popup.querySelector('.popup__submit');
        this.setEventListeners();
        return this.open.bind(this);
    }

    _getInputValues() {
        return [...this._popup.querySelectorAll('.popup__field')].map(input => input.value)
    }
    
    _handleSubmit = (e) => {
        e.preventDefault();
        this._submitForm(this._getInputValues());
        this.close();
        this._popup.querySelector('.popup__form').reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleSubmit);
    }

    open() {
        super.open();
        this._input.focus();
        this._inputs.forEach((input,i) => (input.value = this._info?.getUserInfo()[i] || ''));
        this._submitButton.classList.add('inactive');
        this._submitButton.disabled = true;
    }
}