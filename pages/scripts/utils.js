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

export {open,close};