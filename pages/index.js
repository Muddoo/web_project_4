const editButton  = document.querySelector('.profile__edit-button');
const box = document.querySelector('.popup__box');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const templateForm = document.querySelector('#template-form').content;
const formElement = templateForm.cloneNode(true);
let formBox;

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

function editForm(e) {
    e.stopPropagation();
    document.querySelector('script').before(formElement);
    formBox = document.querySelector('.popup');
    const formTitle = formBox.querySelector('.popup__header');
    const formButton  = formBox.querySelector('.popup__button');
    const closeButton = formBox.querySelector('.popup__icon');
    const inputName = formBox.querySelector('#name');
    const inputInfo = formBox.querySelector('#about');
    formTitle.textContent = 'Edit profile';
    formButton.textContent = 'Save';
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    setTimeout(() => {
      formBox.classList.add('visible');
      inputName.focus();
    }, 22);
    formBox.addEventListener('click', function handleClick(e) {
      if(e.target === closeButton || e.target === formBox || e.target === formButton) formBox.removeEventListener('click', handleClick);
      if(e.target === closeButton || e.target === formBox) formBox.classList.remove('visible');
      if(e.target === formButton) {
         formButton.disabled = true;
         txtName.textContent = inputName.value; 
         txtInfo.textContent = inputInfo.value;
         formBox.classList.remove('visible');
      };
    });
    formButton.disabled = false;
};

editButton.addEventListener('click', editForm);