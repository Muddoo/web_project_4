const SubmitButtons = document.querySelectorAll('.popup__submit');
const editButton  = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const txtName = document.querySelector('.profile__name');
const txtInfo = document.querySelector('.profile__text');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template-card').content;
const popupFigure = document.querySelector('.popup_figure');
const figureImage = popupFigure.querySelector('.popup__image');
const figureCaption = popupFigure.querySelector('.popup__caption');
const profileFormModal = document.querySelector('.popup_profile');
const userInputName = document.forms.profileform.elements.name;
const userInputInfo = document.forms.profileform.elements.about;
const cardFormModal = document.querySelector('.popup_card');
const createCardForm = cardFormModal.querySelector('.popup__form');
const imgInputName = document.forms.cardform.elements.title;
const imgInputLink = document.forms.cardform.elements.image;
const inputListFormModal = profileFormModal.querySelectorAll('.popup__field');
const inputListCardModal = cardFormModal.querySelectorAll('.popup__field');
const submitButtonFormModal = profileFormModal.querySelector('.popup__submit');
const submitButtonCardModal = cardFormModal.querySelector('.popup__submit');

function toggle(element) {
  element.classList.toggle('visible');
}

function disableAllSubmitButtons() {
   SubmitButtons.forEach(button => button.disabled = true);
}

function close(popup) {
  popup.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', escHandler);
  disableAllSubmitButtons();
  toggle(popup);
}

function escHandler(e) {
  if(e.key === 'Escape') {
    close(document.querySelector('.visible'));
  }
}

function closePopup(e) {
  (e.target === this || e.target === this.querySelector('.popup__close')) && close(this);
}

function validateForm(inputList,submitButton) {
  inputList.forEach(input => checkValidity(input));
  submitButton.classList.add('inactive');
  submitButton.disabled = true;
}

function open(popup) {
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', escHandler);
  toggle(popup);
}

function showImage(link,name) {
    figureImage.setAttribute('src', link);
    figureImage.setAttribute('alt', name);
    figureCaption.textContent = name;
    open(popupFigure);
}

function createCard(link, name) {
  const cardElement = templateCard.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText  = cardElement.querySelector('.card__text');
  const cardLike = cardElement.querySelector('.card__icon-heart');
  const cardDelete = cardElement.querySelector('.card__icon-delete');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardText.textContent = name;
  cardImage.addEventListener('click', () => showImage(link,name));
  cardLike.addEventListener('click', e => e.target.classList.toggle('card__icon-heart_black'));
  cardDelete.addEventListener('click', e => e.target.closest('.card').remove());
  return cardElement;
}
 
for(const {link,name} of initialCards)  cards.append(createCard(link,name));

function editForm() {
    userInputName.value = txtName.textContent;
    userInputInfo.value = txtInfo.textContent;
    validateForm(inputListFormModal,submitButtonFormModal);
    open(profileFormModal);
    userInputName.focus();
}

function addForm() {
  validateForm(inputListCardModal,submitButtonCardModal);
  open(cardFormModal);
  imgInputName.focus();
}

profileFormModal.addEventListener('submit', e => {
    e.preventDefault();
    txtName.textContent = userInputName.value;
    txtInfo.textContent = userInputInfo.value;
    close(profileFormModal.closest('.popup'));
});
 
cardFormModal.addEventListener('submit', e => {
  e.preventDefault(); 
  cards.prepend(createCard(imgInputLink.value, imgInputName.value));
  createCardForm.reset();
  close(cardFormModal.closest('.popup'));
});

editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);