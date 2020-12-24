import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

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

export {initialCards,newSection,userInfo,formValidator,handleEditButtonClick,handleAddButtonClick}