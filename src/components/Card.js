export default class Card {
    constructor({item, handleClick, userInfo}, template) {
        this._template = document.querySelector(template).content.cloneNode(true);
        this._userId = userInfo.getUserId();
        this._item = item;
        this._showImage = handleClick.handleCardClick;
        this._deleteCard = handleClick.handleDeleteClick;
        this._likeCard = handleClick.handleLikeClick;
    }
  
    _getTemplate() {
      this._cardElement = this._template.querySelector('.card');
      this._cardElement.dataset.id = this._item._id;
      this._cardImage  = this._cardElement.querySelector('.card__image');
      this._cardText   = this._cardElement.querySelector('.card__text');
      this._cardLike   = this._cardElement.querySelector('.card__icon-heart');
      this._cardDelete = this._cardElement.querySelector('.card__icon-delete');
      this._item.owner._id !== this._userId && (this._cardDelete.hidden = true);
      this._item.likes.some(({_id}) => _id === this._userId) && this._cardLike.classList.add('card__icon-heart_black','animate');
      this._cardElement.querySelector('.card__likes').textContent = this._item.likes.length;
    }
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', () => this._showImage(this._item));
      this._cardDelete.addEventListener('click', () => this._deleteCard(this._cardElement));
      this._cardLike.addEventListener('click', () => this._likeCard(this._cardElement));
    }
  
    generateCard() {
      this._getTemplate();
      this._setEventListeners();
      this._cardImage.src = this._item.link;
      this._cardImage.alt = this._item.name;
      this._cardText.textContent = this._item.name;
      return this._cardElement;
    }
}