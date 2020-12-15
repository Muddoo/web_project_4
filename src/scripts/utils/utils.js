import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'

const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template-card').content;
const cardFormModal = document.querySelector('.popup_card');
const createCardForm = cardFormModal.querySelector('.popup__form');

function profileFormSubmit([name,info]) {
    new UserInfo(['.profile__name','.profile__text']).setUserInfo(name,info);
  }
  
function cardFormSubmit([name,link]) {
    const newCard = {name, link};
    cards.prepend(new Card(newCard,templateCard));
    createCardForm.reset();
}

export {editButton, addButton, templateCard, profileFormSubmit, cardFormSubmit}