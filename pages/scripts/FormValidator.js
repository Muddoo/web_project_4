export default class FormValidator {
    constructor(settings,form) {
        this._settings = settings;
        this._form = form;
        this._enableValidation();
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

    static disableSubmitButton(submitButton,inactiveButtonClass = 'inactive') {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    }

    _setButtonState(inputList,submitButton,inactiveButtonClass) {
        const isValid = [...inputList].every(input => input.validity.valid && input.value.trim());
        if(isValid) {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
        } else {
        FormValidator.disableSubmitButton(submitButton,inactiveButtonClass);
        }
   }

    _enableValidation() {
        const {inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass} = this._settings;
        const inputList = this._form.querySelectorAll(inputSelector);
        const submitButton = this._form.querySelector(submitButtonSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input,inputErrorClass);
                this._setButtonState(inputList,submitButton,inactiveButtonClass);
            });
        });
    }
}