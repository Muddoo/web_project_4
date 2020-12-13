import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import initialCards from '../utils/initialcards.js'
import {editButton, addButton, templateCard, profileFormSubmit, cardFormSubmit} from '../utils/utils.js'

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

editButton.addEventListener('click', () => new PopupWithForm('.popup_profile',{
  info: new UserInfo(['.profile__name','.profile__text']).getUserInfo(),
  submit: profileFormSubmit
}));

addButton.addEventListener('click', () => new PopupWithForm('.popup_card', {
  submit: cardFormSubmit
}));