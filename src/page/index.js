import './index.css'
import {formValidator,handleEditButtonClick,handleAddButtonClick} from '../utils/constants.js'

document.querySelectorAll('.popup__form').forEach(form => formValidator(form));
document.querySelector('.profile__edit-button').addEventListener('click', handleEditButtonClick);
document.querySelector('.profile__add-button').addEventListener('click', handleAddButtonClick);