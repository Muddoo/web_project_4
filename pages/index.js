const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;
const templateForm = document.querySelector('#template-form').content;
const templateFigure = document.querySelector('#template-figure').content;
const formElement = templateForm.cloneNode(true);
const addElement = templateForm.cloneNode(true);
const figureElement = templateFigure.cloneNode(true);
let formBox;
let addBox;

formElement.querySelector('.popup').id = 'form';
addElement.querySelector('.popup').id = 'add';

function handleClick(e,closeIcon,element,submitObject,removeListener) {
  if(submitObject && e.target === submitObject.button) {
    e.preventDefault();
    submitObject.button.disabled = true;
    for(key in submitObject) {
      if(Array.isArray(submitObject[key])) submitObject[key][0][submitObject[key][2]] = submitObject[key][1];
      if(typeof submitObject[key] === 'function') submitObject[key]();
    };
  };
  if(e.target === element || e.target === closeIcon || e.target === submitObject.button) {
    element.classList.remove('visible');
    if(removeListener) element.removeEventListener('click', removeListener);
  } 
};

function showImage(link,name) {
    document.querySelector('script').before(figureElement);
    const popupFigure = document.querySelector('.popup-figure');
    const figureImage = popupFigure.querySelector('.popup-figure__image');
    const figureCaption = popupFigure.querySelector('.popup-figure__caption');
    const closeButton = popupFigure.querySelector('.popup-figure__icon');
    setTimeout(() => popupFigure.classList.add('visible'), 20);
    figureImage.setAttribute('src', link);
    figureCaption.textContent = name;
    popupFigure.addEventListener('click', e => handleClick(e,closeButton,popupFigure));
}

function createCard(link, name, insert = 'append') {
  const cardElement = templateCard.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText  = cardElement.querySelector('.card__text');
  const cardLike = cardElement.querySelector('.card__icon-heart');
  const cardDelete = cardElement.querySelector('.card__icon-delete');
  cardImage.setAttribute('src', link);
  cardText.textContent = name;
  cardImage.addEventListener('click', e => showImage(link,name));
  cardLike.addEventListener('click', e => e.target.src.includes('black') ? e.target.src = '../images/Vectorheart.jpg' : e.target.src = '../images/blackHeart.svg');
  cardDelete.addEventListener('click', e => e.target.closest('.card').remove())
  if(insert !== 'append') return cards.prepend(cardElement);
  cards.append(cardElement);
}

(function initialCards() {
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
      for(initialCard of initialCards)  createCard(initialCard.link, initialCard.name);
})();

function editForm(e) {
    e.stopPropagation();
    document.querySelector('script').before(formElement);
    formBox = document.querySelector('#form');
    const formTitle = formBox.querySelector('.popup__header');
    const formButton  = formBox.querySelector('.popup__button');
    const closeButton = formBox.querySelector('.popup__icon');
    const inputName = formBox.querySelector('#name');
    const inputInfo = formBox.querySelector('#about');
    formTitle.textContent = 'Edit profile';
    formButton.textContent = 'Save';
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    setTimeout(() => {
      formBox.classList.add('visible');
      inputName.focus();
    }, 22);
    formBox.addEventListener('click', function form(e) {
      formObj = {
        button: formButton,
        nameValue: [txtName, inputName.value, 'textContent'],
        infoValue: [txtInfo, inputInfo.value, 'textContent'],
      };
      handleClick(e,closeButton,this,formObj,form);
    });
    formButton.disabled = false;
};

function addForm(e) {
    e.stopPropagation();
    document.querySelector('script').before(addElement);
    addBox = document.querySelector('#add');
    const formTitle = addBox.querySelector('.popup__header');
    const formButton  = addBox.querySelector('.popup__button');
    const closeButton = addBox.querySelector('.popup__icon');
    const inputName = addBox.querySelector('#name');
    const inputLink = addBox.querySelector('#about');
    formTitle.textContent = 'New place';
    formButton.textContent = 'Create';
    inputName.placeholder = 'Title';
    inputLink.placeholder = 'Image link';
    setTimeout(() => {
      addBox.classList.add('visible');
      inputName.focus();
    }, 22);
    addBox.addEventListener('click', function add(e) {
      createObj = {
        button: formButton,
        create() {
          createCard(inputLink.value, inputName.value, 'prepend');
        },
        nameValue: [inputName, '', 'value'],
        linkValue: [inputLink, '', 'value'],
      }
      handleClick(e,closeButton,this,createObj,add);
    });
    formButton.disabled = false;
};

editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);