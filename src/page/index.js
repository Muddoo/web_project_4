import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import {initialCards} from '../utils/constants.js'

const imagePopupObject = new PopupWithImage('.popup_figure');
const handleCardClick = (link,name) => imagePopupObject.open(link,name);
const renderer = item => new Card({item,handleCardClick},'.template-card').generateCard();
const newSection = items => new Section({items, renderer}, '.cards').add();
const userInfo = new UserInfo(['.profile__name','.profile__text']);
const profileFormSubmit = ([name,info]) => userInfo.setUserInfo(name,info);
const cardFormSubmit = ([name,link]) => newSection([{name,link}]);
const formValidator = form => new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'inactive',
  inputErrorClass: 'popup__field_border_red',
  errorClass: 'popup__error_visible'
},form).enableValidation();
const handleEditButtonClick = new PopupWithForm('.popup_profile',{
  info: userInfo,
  submit: profileFormSubmit
});
const handleAddButtonClick = new PopupWithForm('.popup_card', {
  submit: cardFormSubmit
});

newSection(initialCards);
document.querySelectorAll('.popup__form').forEach(form => formValidator(form));
document.querySelector('.profile__edit-button').addEventListener('click', () => handleEditButtonClick.open());
document.querySelector('.profile__add-button').addEventListener('click', () => handleAddButtonClick.open());