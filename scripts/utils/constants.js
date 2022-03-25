export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
export const cardsContainerSelector = '.elements-grid';
export const profilePopupSelector = '.popup_type_add-profile';
export const imagePopupSelector = '.popup_type_add-image';
export const cardPopupSelector = '.popup_type_add-card'; 


export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const name = document.querySelector('.profile__heading-text');
export const job = document.querySelector('.profile__paragraph-text');
export const popupCloseButton = document.querySelector('.popup__close');


//export const popupCloseButton = imagePopup.querySelector('.popup__close');
//export const cardPopupForm = cardPopup.querySelector('.popup__form');
//export const profilePopupForm = profilePopup.querySelector('.popup__form');
//export const imageElement = document.querySelector('.popup__item-image');
  
  
export const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    inputErrorClass: 'popup__form-item_type_error',
    errorMessageClass: 'popup__form-item-error_opened',
    buttonSelector: '.popup__save-button',
    disabledButtonClass: 'popup__save-button_disabled',
};