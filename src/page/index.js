import './index.css'
import {initialCards,newSection,formValidator,handleEditButtonClick,handleAddButtonClick} from '../utils/constants.js'
newSection(initialCards);
document.querySelectorAll('.popup__form').forEach(form => formValidator(form));
document.querySelector('.profile__edit-button').addEventListener('click', () => handleEditButtonClick.open());
document.querySelector('.profile__add-button').addEventListener('click', () => handleAddButtonClick.open());