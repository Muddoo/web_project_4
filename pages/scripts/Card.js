import PopupWithImage from './PopupWithImage.js';

export default class Card {
    constructor(data,template) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;
        return this._generateCard();
    }
  
    _getTemplate() {
       return this._template.cloneNode(true);
    }
  
    _handleLike(e) {
      e.target.classList.toggle('card__icon-heart_black');
    }
  
    _handleDelete(e) {
      e.target.closest('.card').remove();
    }
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', event => new PopupWithImage('.popup_figure', event.target));
      this._cardLike.addEventListener('click', this._handleLike);
      this._cardDelete.addEventListener('click', this._handleDelete);
    }
  
    _generateCard() {
      this._cardElement = this._getTemplate();
      this._cardImage  = this._cardElement.querySelector('.card__image');
      this._cardText   = this._cardElement.querySelector('.card__text');
      this._cardLike   = this._cardElement.querySelector('.card__icon-heart');
      this._cardDelete = this._cardElement.querySelector('.card__icon-delete');
      this._setEventListeners();
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardText.textContent = this._name;
      return this._cardElement;
    }
}