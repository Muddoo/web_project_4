function showError(input, inputErrorClass) {
    input.classList.add(inputErrorClass);
    if(/\d/.test(input.value.trim()) && !input.validationMessage) input.setCustomValidity('Number is not allowed, yo!');
    else if(input.value.trim().length < 2 && !input.validationMessage) input.setCustomValidity('You gotta fill this out with two characters at least, yo!');
    input.nextElementSibling.textContent = input.validationMessage;
}

function hideError(input, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    input.nextElementSibling.textContent = '';
}

function checkValidity(input,inputErrorClass = "popup__field_border_red") {
     input.setCustomValidity('');
     input.validity.valid && input.value.trim().length > 1 && !/\d/.test(input.type !== 'url' && input.value.trim()) ?  hideError(input,inputErrorClass) : showError(input,inputErrorClass);
}

function setButtonState(inputList,submitButton,inactiveButtonClass = "inactive") {
     const isValid = [...inputList].every(input => input.validity.valid && input.value.trim());
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