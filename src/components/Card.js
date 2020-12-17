export default class Card {
    constructor(template,imagePopup) {
        this._template = document.querySelector(template).content;
        this._imagePopup = imagePopup;
        return this._generateCard.bind(this);
    }
  
    _getTemplate() {
      this._cardElement = this._template.cloneNode(true);
      this._cardImage  = this._cardElement.querySelector('.card__image');
      this._cardText   = this._cardElement.querySelector('.card__text');
      this._cardLike   = this._cardElement.querySelector('.card__icon-heart');
      this._cardDelete = this._cardElement.querySelector('.card__icon-delete');
    }
  
    _handleLike(e) {
      e.target.classList.toggle('card__icon-heart_black');
    }
  
    _handleDelete(e) {
      e.target.closest('.card').remove();
    }
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', this._imagePopup);
      this._cardLike.addEventListener('click', this._handleLike);
      this._cardDelete.addEventListener('click', this._handleDelete);
    }
  
    _generateCard({name,link}) {
      this._getTemplate();
      this._setEventListeners();
      this._cardImage.src = link;
      this._cardImage.alt = name;
      this._cardText.textContent = name;
      return this._cardElement;
    }
}