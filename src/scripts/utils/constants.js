export const settings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  headers: {
    authorization: 'da8d254e-f76c-47fc-b6b9-7e52d3faf87e',
    'Content-Type': 'application/json'
  }
};
export const cardsContainerSelector = '.elements-grid';
export const profilePopupSelector = '.popup_type_add-profile';
export const imagePopupSelector = '.popup_type_add-image';
export const cardPopupSelector = '.popup_type_add-card'; 
export const avatarPopupSelector = '.popup_type_edit-avatar';
export const confirmPopupSelector = '.popup_type_confirm';


export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const name = document.querySelector('.profile__heading-text');
export const job = document.querySelector('.profile__paragraph-text');
export const popupCloseButton = document.querySelector('.popup__close');
export const avatarEditButton = document.querySelector('.profile__avatar-button');
 
  
export const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    inputErrorClass: 'popup__form-item_type_error',
    errorMessageClass: 'popup__form-item-error_opened',
    buttonSelector: '.popup__save-button',
    disabledButtonClass: 'popup__save-button_disabled',
};