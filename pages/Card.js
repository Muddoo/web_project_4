const popupFigure = document.querySelector('.popup_figure');
const figureImage = popupFigure.querySelector('.popup__image');
const figureCaption = popupFigure.querySelector('.popup__caption');

class Card {
    constructor(data,template) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;
    }
  
    _getTemplate() {
       return this._template.cloneNode(true);
    }
    
    _showImage(e) {      
      figureImage.setAttribute('src', e.target.src);
      figureImage.setAttribute('alt', e.target.alt);
      figureCaption.textContent = e.target.alt;
      open(popupFigure);
    }
  
    _handleLike(e) {
      e.target.classList.toggle('card__icon-heart_black');
    }
  
    _handleDelete(e) {
      e.target.closest('.card').remove();
    }
  
    _setEventListeners() {
      this._cardImage.addEventListener('click', this._showImage);
      this._cardLike.addEventListener('click', this._handleLike);
      this._cardDelete.addEventListener('click', this._handleDelete);
    }
  
    generateCard() {
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

function toggle(element) {
    element.classList.toggle('visible');
}
  
function close(popup) {
    popup.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', escHandler);
    document.activeElement.blur();
    toggle(popup);
}
  
function escHandler(e) {
    if(e.key === 'Escape') close(document.querySelector('.visible'));
}

function closePopup(e) {
    (e.target === this || e.target === this.querySelector('.popup__close')) && close(this);
}

function open(popup) {
    popup.addEventListener('click', closePopup);
    document.addEventListener('keydown', escHandler);
    toggle(popup);
}

export {Card, open, close};