import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector);
        this._input = this._popup.querySelector('.popup__field');
        this._inputs = this._popup.querySelectorAll('.popup__field');
        this._submitForm = submit;
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._submitText = this._submitButton.textContent;
        this.setEventListeners();
    }

    _getInputValues() {
        return [...this._popup.querySelectorAll('.popup__field')].map(input => input.value)
    }
    
    _handleSubmit = (e) => {
        e.preventDefault();
        this._submitForm({value: this._getInputValues(), info: this._info});
        this._submitButton.textContent = 'Saving...'
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleSubmit);
    }

    _handleKeyPress(e) {
        super._handleKeyPress(e);
        if(e.key === 'Enter') !this._submitButton.disabled && this._handleSubmit(e);
    }

    close() {
        super.close();
        this._inputs.forEach(input => {
            input.classList.remove('popup__field_border_red');
            input.nextElementSibling.textContent = '';
        });
    }

    reset() {
        this._popup.querySelector('.popup__form').reset();
    }

    open(info) {
        super.open();
        this._submitButton.textContent = this._submitText;
        this._info = info;
        this._input?.focus();
        this._inputs.forEach((input,i) => (input.value = this._info?.getUserInfo()[i] || ''));
        !this._submitButton.classList.contains('active') && this._submitButton.classList.add('inactive');
        !this._submitButton.classList.contains('active') && (this._submitButton.disabled = true);
    }
}