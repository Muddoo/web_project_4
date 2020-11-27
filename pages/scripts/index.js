import initialCards from './initialcards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {open,close} from './utils.js';

const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template-card').content;
const profileFormModal = document.querySelector('.popup_profile');
const userInputName = document.forms.profileform.elements.name;
const userInputInfo = document.forms.profileform.elements.about;
const cardFormModal = document.querySelector('.popup_card');
const createCardForm = cardFormModal.querySelector('.popup__form');
const imgInputName = document.forms.cardform.elements.title;
const imgInputLink = document.forms.cardform.elements.image;
const submitButtonFormModal = profileFormModal.querySelector('.popup__submit');
const submitButtonCardModal = cardFormModal.querySelector('.popup__submit');

function initiateAndInsertCard(cardInfo,insert) {
  const cardObj = new Card(cardInfo,templateCard);
  const card    = cardObj.generateCard();
  cards[insert](card);
}

for(const initialCard of initialCards)   initiateAndInsertCard(initialCard,'append');

document.querySelectorAll('.popup__form').forEach(form => {
  const formObj = new FormValidator({
      formSelector: '.popup__form',
      inputSelector: '.popup__field',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'inactive',
      inputErrorClass: 'popup__field_border_red',
      errorClass: 'popup__error_visible'
    },form);

    formObj.enableValidation();
});

function profileFormSubmit(e) {
  e.preventDefault();
  txtName.textContent = userInputName.value;
  txtInfo.textContent = userInputInfo.value;
  close(profileFormModal);
}

function cardFormSubmit(e) {
  e.preventDefault(); 
  const newCard = {name: imgInputName.value, link: imgInputLink.value};
  initiateAndInsertCard(newCard,'prepend')
  createCardForm.reset();
  close(cardFormModal);
}

function editForm() {
  userInputName.value = txtName.textContent;
  userInputInfo.value = txtInfo.textContent;
  FormValidator.disableSubmitButton(submitButtonFormModal);
  open(profileFormModal);
  userInputName.focus();
}

function addForm() {
  FormValidator.disableSubmitButton(submitButtonCardModal);
  open(cardFormModal);
  imgInputName.focus();
}

profileFormModal.addEventListener('submit', profileFormSubmit);
cardFormModal.addEventListener('submit', cardFormSubmit);
editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);