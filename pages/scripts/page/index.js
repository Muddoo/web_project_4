import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import initialCards from '../utils/initialcards.js'
import {
  editButton,
  addButton,
  // cards,
  templateCard,
  // userInputName,
  // userInputInfo,
  // cardFormModal,
  // createCardForm,
  // imgInputName,
  // imgInputLink,
  profileFormSubmit,
  cardFormSubmit,
} from '../utils/utils.js'
// const editButton  = document.querySelector('.profile__edit-button');
// const addButton = document.querySelector('.profile__add-button');
// const cards = document.querySelector('.cards');
// const templateCard = document.querySelector('.template-card').content;
// const userInputName = document.forms.profileform.elements.name;
// const userInputInfo = document.forms.profileform.elements.about;
// const cardFormModal = document.querySelector('.popup_card');
// const createCardForm = cardFormModal.querySelector('.popup__form');
// const imgInputName = document.forms.cardform.elements.title;
// const imgInputLink = document.forms.cardform.elements.image;

new Section({
  items: initialCards,
  renderer(item) {
    return new Card(item,templateCard);
  }
},'.cards');

document.querySelectorAll('.popup__form').forEach(form => (
  new FormValidator({
      formSelector: '.popup__form',
      inputSelector: '.popup__field',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'inactive',
      inputErrorClass: 'popup__field_border_red',
      errorClass: 'popup__error_visible'
    },form)
));

// function profileFormSubmit() {
//   new UserInfo(['.profile__name','.profile__text']).setUserInfo(userInputName.value,userInputInfo.value);
// }

// function cardFormSubmit() {
//   const newCard = {name: imgInputName.value, link: imgInputLink.value};
//   cards.prepend(new Card(newCard,templateCard));
//   createCardForm.reset();
// }

editButton.addEventListener('click', () => new PopupWithForm('.popup_profile',{
  info: new UserInfo(['.profile__name','.profile__text']).getUserInfo(),
  submit: profileFormSubmit
}));

addButton.addEventListener('click', () => new PopupWithForm('.popup_card', {
  submit: cardFormSubmit
}));