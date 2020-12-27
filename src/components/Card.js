export default class Card {
    constructor({item, handleClick}, template) {
        this._template = document.querySelector(template).content.cloneNode(true);
        this._item = item;
        this._imagePopup = handleClick.handleCardClick;
        this._deletePopup = handleClick.handleDeleteClick
    }
  
    _getTemplate() {
      this._cardElement = this._template.querySelector('.card');
      this._cardImage  = this._cardElement.querySelector('.card__image');
      this._cardText   = this._cardElement.querySelector('.card__text');
      this._cardLike   = this._cardElement.querySelector('.card__icon-heart');
      this._cardDelete = this._cardElement.querySelector('.card__icon-delete');
    }
  
    _handleLike() {
      this._cardLike.classList.toggle('card__icon-heart_black');
    }
  
    _handleDelete() {
      this._cardElement.remove()
    }
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', () => this._imagePopup(this._item));
      this._cardLike.addEventListener('click', this._handleLike.bind(this));
      this._cardDelete.addEventListener('click', () => this._deletePopup(this._cardElement));
    }
  
    generateCard() {
      this._getTemplate();
      this._setEventListeners();
      this._cardImage.src = this._item.link;
      this._cardImage.alt = this._item.link;
      this._cardText.textContent = this._item.name;
      return this._cardElement;
    }
}