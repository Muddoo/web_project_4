const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;

function showImage(link,name) {
    const popupFigure = document.querySelector('.popup-figure');
    const figureImage = popupFigure.querySelector('.popup-figure__image');
    const figureCaption = popupFigure.querySelector('.popup-figure__caption');
    const closeButton = popupFigure.querySelector('.popup-figure__close');
    popupFigure.classList.add('visible');
    figureImage.setAttribute('src', link);
    figureCaption.textContent = name;
    popupFigure.addEventListener('click', e => (e.target === popupFigure || e.target === closeButton) && popupFigure.classList.remove('visible'));
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
  cardLike.addEventListener('click', e => e.target.classList.toggle('card__icon-heart_black'));
  cardDelete.addEventListener('click', e => e.target.closest('.card').remove())
  cards[insert](cardElement);
};

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

function editForm(e) {
    e.stopPropagation();
    const formBox = document.querySelector('#form');
    const formButton  = formBox.querySelector('.popup__submit');
    const closeButton = formBox.querySelector('.popup__close');
    const inputName = formBox.querySelector('#name');
    const inputInfo = formBox.querySelector('#about');
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    formBox.classList.add('visible');
    inputName.focus();
    formBox.addEventListener('click', function form(e) {
      if(e.target === formButton) {
        e.preventDefault();
        formButton.disabled = true;
        txtName.textContent = inputName.value;
        txtInfo.textContent = inputInfo.value;
      };
      if(e.target === formButton || e.target === formBox || e.target === closeButton) {
        formBox.classList.remove('visible');
        formBox.removeEventListener('click', form);
      };
    });
    formButton.disabled = false;
};

function addForm(e) {
    e.stopPropagation();
    const addBox = document.querySelector('#add');
    const formButton  = addBox.querySelector('.popup__submit');
    const closeButton = addBox.querySelector('.popup__close');
    const inputName = addBox.querySelector('#img-name');
    const inputLink = addBox.querySelector('#image');
    addBox.classList.add('visible');
    inputName.focus();
    addBox.addEventListener('click', function add(e) {
      if(e.target === formButton) {
        e.preventDefault();
        formButton.disabled = true;
        createCard(inputLink.value, inputName.value, 'prepend');
        inputName.value = '';
        inputLink.value = '';
      }
      if(e.target === formButton || e.target === addBox || e.target === closeButton) {
        addBox.classList.remove('visible');
        addBox.removeEventListener('click', add);
      };
    });
    formButton.disabled = false;
};

editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);