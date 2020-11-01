const editButton  = document.querySelector('.profile__edit-button');
const box = document.querySelector('.popup__box');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');

(function initialCards() {
    const cards = document.querySelector('.cards');
    const templateCard = document.querySelector('#template-card').content;
    const initialCards = [
        {
          name: "Yosemite Valley",
          link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
        },
        {
          name: "Lake Louise",
          link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
        },
        {
          name: "Bald Mountains",
          link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
        },
        {
          name: "Latemar",
          link: "https://code.s3.yandex.net/web-code/latemar.jpg"
        },
        {
          name: "Vanoise National Park",
          link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
        },
        {
          name: "Lago di Braies",
          link: "https://code.s3.yandex.net/web-code/lago.jpg"
        }
      ]; 
      for(initialCard of initialCards) {
          const cardElement = templateCard.cloneNode(true);
          const cardImage = cardElement.querySelector('.card__image');
          const cardText  = cardElement.querySelector('.card__text');
          cardImage.setAttribute('src', initialCard.link);
          cardText.textContent = initialCard.name;
          cards.append(cardElement);
      }
})();

function toggleBox(e, button, box) {
    if(button.contains(e.target)) box.classList.toggle('visible');
    console.log(box)
};

function handleSubmit(e, inputName, inputInfo) {
    e.preventDefault();
    e.stopPropagation();
    txtName.textContent = inputName.value; 
    txtInfo.textContent = inputInfo.value;
};

function editForm(e) {
    e.stopPropagation();
    const templateForm = document.querySelector('#template-form').content;
    const formElement = templateForm.cloneNode(true);
    const formBox = formElement.querySelector('.popup');
    const formTitle = formElement.querySelector('.popup__header');
    const formButton  = formElement.querySelector('.popup__button');
    const closeButton = formElement.querySelector('.popup__icon');
    const inputName = formElement.querySelector('#name');
    const inputInfo = formElement.querySelector('#about');
    formTitle.textContent = 'Edit profile';
    formButton.textContent = 'Save';
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    document.body.append(formElement);
    toggleBox(e, editButton, formBox);
    inputName.focus();
    closeButton.addEventListener('click', e => toggleBox(e, closeButton, formBox));
    formButton.addEventListener('click', e => {
        handleSubmit(e, inputName, inputInfo);
        toggleBox(e, formButton, formBox);
    });
    document.body.addEventListener('click', e => e.target === formBox ? toggleBox(e, formBox, formBox) : null);
};

editButton.addEventListener('click', editForm);