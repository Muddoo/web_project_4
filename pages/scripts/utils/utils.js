import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'

const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template-card').content;
const userInputName = document.forms.profileform.elements.name;
const userInputInfo = document.forms.profileform.elements.about;
const cardFormModal = document.querySelector('.popup_card');
const createCardForm = cardFormModal.querySelector('.popup__form');
const imgInputName = document.forms.cardform.elements.title;
const imgInputLink = document.forms.cardform.elements.image;

function profileFormSubmit() {
    new UserInfo(['.profile__name','.profile__text']).setUserInfo(userInputName.value,userInputInfo.value);
  }
  
function cardFormSubmit() {
const newCard = {name: imgInputName.value, link: imgInputLink.value};
cards.prepend(new Card(newCard,templateCard));
createCardForm.reset();
}

export {editButton, addButton, templateCard, profileFormSubmit, cardFormSubmit}