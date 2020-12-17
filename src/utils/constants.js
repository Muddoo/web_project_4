import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import {profileFormSubmit,cardFormSubmit} from './utils.js'

//Classes instantiation
const newSection = new Section('.cards');
const userInfo = new UserInfo(['.profile__name','.profile__text']);
const imagePopup = new PopupWithImage('.popup_figure');
const newCard = new Card('.template-card',imagePopup);
const formValidator =  new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'inactive',
  inputErrorClass: 'popup__field_border_red',
  errorClass: 'popup__error_visible'
});
const handleEditButtonClick = new PopupWithForm('.popup_profile',{
  info: userInfo,
  submit: profileFormSubmit
});
const handleAddButtonClick = new PopupWithForm('.popup_card', {
  submit: cardFormSubmit
});

//initialCards
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

//cards section
newSection({
    items: initialCards,
    renderer(item) {
      return newCard(item);
    }
});

export {newSection,newCard,userInfo,formValidator,handleEditButtonClick,handleAddButtonClick}