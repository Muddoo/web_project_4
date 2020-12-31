import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {token} from '../utils/auth.js'

const api = (method = 'GET', body = null) => new Api({
  baseUrl:'https://around.nomoreparties.co/v1/group-7',
  options: {
    method,
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  }
});
const userInfo = new UserInfo(['.profile__name','.profile__text','.profile__image']);

const imagePopupObject = new PopupWithImage('.popup_figure');
const deletePopupObj = new PopupWithForm('.popup_delete',{
  submit: ({info}) => {
    api('DELETE').queryCards(info.dataset.id);
    info.remove();
    deletePopupObj.close();
 }
});
const handleCardClick = image => imagePopupObject.open(image);
const handleDeleteClick = card => deletePopupObj.open(card);
const handleLikeClick = (card) => {
  const heartIcon = card.querySelector('.card__icon-heart');
  const method = heartIcon.classList.contains('card__icon-heart_black') ? 'DELETE' : 'PUT';
  api(method).queryCards(`likes/${card.dataset.id}`)
    .then(({likes}) => {
      heartIcon.classList.toggle('card__icon-heart_black');
      heartIcon.classList.toggle('animate');
      card.querySelector('.card__likes').textContent = likes.length;
  });
}
const renderer = item => new Card({item,handleClick: {handleCardClick,handleDeleteClick,handleLikeClick}, userInfo},'.template-card').generateCard();
const newSection = (items) => new Section({items, renderer}, '.cards').add();
const profilePhotoSubmit = ({value: [avatar]}) =>  api('PATCH',{avatar}).updateProfile('avatar').then(user => {
  userInfo.setUserInfo(user);
  handleProfilePhotoClick.close();
  handleProfilePhotoClick.reset();
});
const profileFormSubmit = ({value: [name,about]}) =>  api('PATCH',{name,about}).updateProfile().then(user => {
  userInfo.setUserInfo(user);
  handleEditButtonClick.close();
  handleEditButtonClick.reset();
});
const cardFormSubmit = ({value: [name,link]}) => api('POST',{name,link}).queryCards().then(card => {
  newSection([card]);
  handleAddButtonClick.close();
  handleAddButtonClick.reset();
})
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

document.querySelectorAll('.popup__form').forEach(form => formValidator(form));
document.querySelector('.profile__wrapper').addEventListener('click', () => handleProfilePhotoClick.open());
document.querySelector('.profile__edit-button').addEventListener('click', () => handleEditButtonClick.open(userInfo));
document.querySelector('.profile__add-button').addEventListener('click', () => handleAddButtonClick.open());

async function initialCards() {
  const [user,cards] = await Promise.all([api().getUser(),api().queryCards()]);
  userInfo.setUserInfo(user);
  newSection(cards.reverse());
}
initialCards();