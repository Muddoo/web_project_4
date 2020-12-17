export default class FormValidator {
    constructor(settings) {
        this._settings = settings;
        return this.enableValidation.bind(this);
    }

    _hideError(input, inputErrorClass) {
        input.classList.remove(inputErrorClass);
        input.nextElementSibling.textContent = '';
    }

    _showError(input, inputErrorClass) {
        input.classList.add(inputErrorClass);
        if(/\d/.test(input.value.trim()) && !input.validationMessage) input.setCustomValidity('Number is not allowed, yo!');
        else if(input.value.trim().length < 2 && !input.validationMessage) input.setCustomValidity('You gotta fill this out with two characters at least, yo!');
        input.nextElementSibling.textContent = input.validationMessage;
    }

    _checkValidity(input,inputErrorClass) {
        input.setCustomValidity('');
        input.validity.valid &&
        input.value.trim().length > 1 &&
        !/\d/.test(input.type !== 'url' && input.value.trim()) ?
          this._hideError(input,inputErrorClass) : this._showError(input,inputErrorClass);
   }

    _disableSubmitButton(submitButton,inactiveButtonClass = 'inactive') {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    }

    _setButtonState(inputList,submitButton,inactiveButtonClass) {
        const isValid = [...inputList].every(input => input.validity.valid && input.value.trim());
        if(isValid) {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
        } else {
        this._disableSubmitButton(submitButton,inactiveButtonClass);
        }
   }

    enableValidation(form) {
        const {inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass} = this._settings;
        const inputList = form.querySelectorAll(inputSelector);
        const submitButton = form.querySelector(submitButtonSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input,inputErrorClass);
                this._setButtonState(inputList,submitButton,inactiveButtonClass);
            });
        });
    }
}