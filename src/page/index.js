import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import {initialCards} from '../utils/constants.js'

const profileImage = document.querySelector('.profile__image');
const imagePopupObject = new PopupWithImage('.popup_figure');
const deletePopupObj = new PopupWithForm('.popup_delete',{
  submit: ({info}) => info.remove()
});
const handleCardClick = image => imagePopupObject.open(image);
const handleDeleteClick = card => deletePopupObj.open(card);
const renderer = item => new Card({item,handleClick: {handleCardClick,handleDeleteClick}},'.template-card').generateCard();
const newSection = items => new Section({items, renderer}, '.cards').add();
const userInfo = new UserInfo(['.profile__name','.profile__text']);
const profilePhotoSubmit = ({value: [link]}) =>  profileImage.src = link;
const profileFormSubmit = ({value: [name,info]}) => userInfo.setUserInfo(name,info);
const cardFormSubmit = ({value: [name,link]}) => newSection([{name,link}]);
const formValidator = form => new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'inactive',
  inputErrorClass: 'popup__field_border_red',
  errorClass: 'popup__error_visible'
},form).enableValidation();
const handleProfilePhotoClick = new PopupWithForm('.popup_profile-photo',{
  submit: profilePhotoSubmit 
});
const handleEditButtonClick = new PopupWithForm('.popup_profile-info',{
  submit: profileFormSubmit
});
const handleAddButtonClick = new PopupWithForm('.popup_card', {
  submit: cardFormSubmit
});

newSection(initialCards);
document.querySelectorAll('.popup__form').forEach(form => formValidator(form));
document.querySelector('.profile__wrapper').addEventListener('click', () => handleProfilePhotoClick.open());
document.querySelector('.profile__edit-button').addEventListener('click', () => handleEditButtonClick.open(userInfo));
document.querySelector('.profile__add-button').addEventListener('click', () => handleAddButtonClick.open());