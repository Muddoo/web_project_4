const forms = document.querySelectorAll('.popup__form');

function showError(input) {
    input.classList.add('popup__field_border_red');
    input.nextElementSibling.textContent = input.validationMessage;
}
function hideError(input) {
    input.classList.remove('popup__field_border_red');
    input.nextElementSibling.textContent = '';
}

function checkValidity(input) {
     input.validity.valid ?  hideError(input) : showError(input);
}

function setButtonState(inputList,submitButton) {
     const isValid = [...inputList].every(input => input.validity.valid);
     if(isValid) {
        submitButton.classList.remove('inactive');
        submitButton.disabled = false;
     } else {
        submitButton.classList.add('inactive');
        submitButton.disabled = true;
     }
}

function toggle(element) {
    const inputList = element.querySelectorAll('.popup__field');
    const submitButton = element.querySelector('.popup__submit');
    inputList && inputList.forEach(input => checkValidity(input));
    submitButton && setButtonState(inputList,submitButton);
    element.classList.toggle('visible');
  } 

// function enableValidation({formSelector,inputSelector,submitButtonSelector}) {

forms.forEach(form => {
    const inputList = form.querySelectorAll('.popup__field');
    const submitButton = form.querySelector('.popup__submit');
    form.addEventListener('submit', e => {
        e.preventDefault();
        toggle(form.closest('.popup'));
        submitButton.disabled = true;
    });

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkValidity(input);
            setButtonState(inputList,submitButton);
        });
    });
});

// }

// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__field",
//     submitButtonSelector: ".popup__submit",
//     inactiveButtonClass: "inactive",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible"
//   });