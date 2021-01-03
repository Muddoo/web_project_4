//style
import './index.css'

//components
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

//token
const token = process.env.TOKEN

//basic api function
const api = new Api({
  baseUrl:'https://around.nomoreparties.co/v1/group-7',
  options: {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    }
  }
});

//User
const userInfo = new UserInfo(['.profile__name','.profile__text','.profile__image']);

//Section and Card class
const imagePopupObject = new PopupWithImage('.popup_figure');
const deletePopupObj = new PopupWithForm('.popup_delete',{
  submit: ({info}) => {
    const options = {
      query: info.dataset.id,
      method: 'DELETE'
    };
    api.queryCards(options)
       .then(() => {
        info.remove();
        deletePopupObj.close();
       });
 }
});
const handleCardClick = image => imagePopupObject.open(image);
const handleDeleteClick = card => deletePopupObj.open(card);
const handleLikeClick = (card) => {
  const heartIcon = card.querySelector('.card__icon-heart');
  const method = heartIcon.classList.contains('card__icon-heart_black') ? 'DELETE' : 'PUT';
  const options = {
    query: `likes/${card.dataset.id}`,
    method
  };
  api.queryCards(options)
    .then(({likes}) => {
      heartIcon.classList.toggle('card__icon-heart_black');
      heartIcon.classList.toggle('animate');
      card.querySelector('.card__likes').textContent = likes.length;
  });
}
const renderer = item => new Card({item,handleClick: {handleCardClick,handleDeleteClick,handleLikeClick}, userInfo},'.template-card').generateCard();
let newSection;

// enable validation for forms
const formValidator = form => new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'inactive',
  inputErrorClass: 'popup__field_border_red',
  errorClass: 'popup__error_visible'
},form).enableValidation();
document.querySelectorAll('.popup__form').forEach(form => formValidator(form));

// handling profile change
function profilePhotoSubmit({value: [avatar]}) {
  const options = {
    avatar: 'avatar',
    body: {avatar}
  }
  api.updateProfile(options).then(user => {
  userInfo.setUserInfo(user);
  this.close();
  this.reset();
 })
}
function profileFormSubmit({value: [name,about]}) {
  const options = {body: {name,about}};
  api.updateProfile(options).then(user => {
  userInfo.setUserInfo(user);
  this.close();
  this.reset();
 })
}
const handleProfilePhotoClick = new PopupWithForm('.popup_profile-photo',{ submit: profilePhotoSubmit });
const handleEditButtonClick = new PopupWithForm('.popup_profile-info',{ submit: profileFormSubmit });
document.querySelector('.profile__wrapper').addEventListener('click', () => handleProfilePhotoClick.open());
document.querySelector('.profile__edit-button').addEventListener('click', () => handleEditButtonClick.open(userInfo));

// handle adding new card
function cardFormSubmit({value: [name,link]}) {
  const options = {
    method: 'POST',
    body: {name,link}
  };
  api.queryCards(options).then(card => {
  newSection.add(card);
  this.close();
  this.reset();
 })
}
const handleAddButtonClick = new PopupWithForm('.popup_card', { submit: cardFormSubmit });
document.querySelector('.profile__add-button').addEventListener('click', () => handleAddButtonClick.open());

// rendering cards from server
async function initialCards() {
  const [user,items] = await Promise.all([api.getUser(),api.queryCards({})]);
  userInfo.setUserInfo(user);
  newSection = new Section({items, renderer}, '.cards');
  newSection.addAll();
}
initialCards();