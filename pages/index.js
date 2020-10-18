const editButton  = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon');
const submitButton = document.querySelector('#submit');
const popup = document.querySelector('.popup');
const box = document.querySelector('.popup__box');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const inputName = document.querySelector('#name');
const inputInfo = document.querySelector('#about');

function openBox() {
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    popup.classList.remove('popup_hidden');
    inputName.focus()
};

function closeBox() {
    popup.classList.add('popup_hidden');
};

function submitInfo(e) {
    e.preventDefault();
    txtName.textContent = inputName.value; 
    txtInfo.textContent = inputInfo.value;
    closeBox();
};

const outsideBox = e => e.target === popup ? closeBox() : null;

document.body.addEventListener('click', outsideBox);
submitButton.addEventListener('click', submitInfo)
editButton.addEventListener('click', openBox);
closeButton.addEventListener('click', closeBox);