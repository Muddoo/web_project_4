const editButton  = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.overlay__icon');
const submitButton = document.querySelector('#submit');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.overlay__box');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const inputName = document.querySelector('#name');
const inputInfo = document.querySelector('#about');

document.body.addEventListener('click', e => e.target === overlay ? closeBox() : null);
submitButton.addEventListener('click', submitInfo)
editButton.addEventListener('click', openBox);
closeButton.addEventListener('click', closeBox);

function openBox() {
    overlay.classList.remove('overlay_hidden');
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
};

function closeBox() {
    overlay.classList.add('overlay_hidden');
};

function submitInfo(e) {
    e.preventDefault();
    if(!inputName.value || !inputInfo.value) return alert('Fill All Fields');
    txtName.textContent = inputName.value; 
    txtInfo.textContent = inputInfo.value;
    closeBox();
}