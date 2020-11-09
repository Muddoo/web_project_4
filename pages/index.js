const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template-card').content;
const popupFigure = document.querySelector('.popup-figure');
const figureImage = popupFigure.querySelector('.popup-figure__image');
const figureCaption = popupFigure.querySelector('.popup-figure__caption');
const closeFigure = popupFigure.querySelector('.popup-figure__close');
const formBox = document.querySelector('.popup');
const saveButton  = formBox.querySelector('.popup__submit');
const closeForm = document.querySelectorAll('.popup__close');
const inputName = formBox.querySelector('.popup__field');
const inputInfo = formBox.querySelectorAll('.popup__field')[1];
const addBox = document.querySelectorAll('.popup')[1];
const createButton  = addBox.querySelector('.popup__submit');
const imgInputName = addBox.querySelector('.popup__field');
const imgInputLink = addBox.querySelectorAll('.popup__field')[1];

const toggle = (element, className) => element.classList.toggle(className);

function showImage(link,name) {
    toggle(popupFigure,'visible');
    figureImage.setAttribute('src', link);
    figureCaption.textContent = name;
};

//  popupFigure.addEventListener('click', e => (e.target === popupFigure || e.target === closeFigure) && toggle(popupFigure,'visible'));
closeFigure.addEventListener('click', () => toggle(popupFigure,'visible'));
// popupFigure.addEventListener('click', e => e.target === popupFigure && toggle(popupFigure,'visible'));

function createCard(link, name) {
  const cardElement = templateCard.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText  = cardElement.querySelector('.card__text');
  const cardLike = cardElement.querySelector('.card__icon-heart');
  const cardDelete = cardElement.querySelector('.card__icon-delete');
  cardImage.setAttribute('src', link);
  cardText.textContent = name;
  cardImage.addEventListener('click', () => showImage(link,name));
  cardLike.addEventListener('click', e => e.target.classList.toggle('card__icon-heart_black'));
  cardDelete.addEventListener('click', e => e.target.closest('.card').remove());
  cards.prepend(cardElement);
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
for(const initialCard of initialCards)  createCard(initialCard.link, initialCard.name);

function editForm(e) {
    inputName.value = txtName.textContent;
    inputInfo.value = txtInfo.textContent;
    toggle(formBox,'visible');
    inputName.focus();
    saveButton.disabled = false;
  };

  // formBox.addEventListener('click', e => {
  //   if(e.target === saveButton) {
  //     e.preventDefault();
  //     saveButton.disabled = true;
  //     txtName.textContent = inputName.value;
  //     txtInfo.textContent = inputInfo.value;
  //   };
  //   if(e.target === saveButton || e.target === formBox || e.target === closeForm) toggle(formBox,'visible');
  // });
  saveButton.addEventListener('click', e => {
      e.preventDefault();
      saveButton.disabled = true;
      txtName.textContent = inputName.value;
      txtInfo.textContent = inputInfo.value;
      toggle(formBox,'visible');
  });
  // closeForm.addEventListener('click', () => toggle(formBox,'visible'));

function addForm(e) {
    toggle(addBox,'visible');
    imgInputName.focus();
    createButton.disabled = false;
  };

  // addBox.addEventListener('click', function add(e) {
  //   if(e.target === createButton) {
  //     e.preventDefault();
  //     createButton.disabled = true;
  //     createCard(imgInputLink.value, imgInputName.value);
  //     imgInputName.value = '';
  //     imgInputLink.value = '';
  //   }
  //   if(e.target === createButton || e.target === addBox || e.target === closeButton) {
  //     addBox.classList.remove('visible');
  //     addBox.removeEventListener('click', add);
  //   };
  // });
 
createButton.addEventListener('click', e => {
  e.preventDefault();
  createButton.disabled = true;
  createCard(imgInputLink.value, imgInputName.value);
  imgInputName.value = '';
  imgInputLink.value = '';
  toggle(addBox,'visible');
});
closeForm.forEach(closeBtn => closeBtn.addEventListener('click', () => toggle(closeBtn.closest('.popup'),'visible')));
// closeForm.forEach(closeBtn => closeBtn.closest('.popup').addEventListener('click', function(e) {
//   (e.target === this || e.target === closeBtn) && toggle(this,'visible');
// }))


editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);

// terrible review as usual ..
// i had mistakes before in css but you didnt see it 
// many mistakes here was approved in the first and second review and you just realized them in this review
// some of your comments arent clear enough .. 
// this is terrible and gives me a very bad experience dealing with your review and i reported that to the team .. 
// dont do that again .. consuming mutltiple reviews and wasting my time and my effort 