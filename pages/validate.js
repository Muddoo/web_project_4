function showError(input, inputErrorClass) {
    input.classList.add(inputErrorClass);
    input.nextElementSibling.textContent = input.validationMessage;
}

function hideError(input, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    input.nextElementSibling.textContent = '';
}

function checkValidity(input,inputErrorClass = "popup__field_border_red") {
     input.validity.valid ?  hideError(input,inputErrorClass) : showError(input,inputErrorClass);
}

function setButtonState(inputList,submitButton,inactiveButtonClass = "inactive") {
     const isValid = [...inputList].every(input => input.validity.valid);
     if(isValid) {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
     } else {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
     }
}

function enableValidation({formSelector,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass}) {
    const forms = document.querySelectorAll(formSelector);
    forms.forEach(form => {
        const inputList = form.querySelectorAll(inputSelector);
        const submitButton = form.querySelector(submitButtonSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                checkValidity(input,inputErrorClass);
                setButtonState(inputList,submitButton,inactiveButtonClass);
            });
        });
    });

}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "inactive",
    inputErrorClass: "popup__field_border_red",
    errorClass: "popup__error_visible"
  });