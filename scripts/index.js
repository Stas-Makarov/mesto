import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
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

const cardsContainer = document.querySelector('.elements-grid');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const name = document.querySelector('.profile__heading-text');
const job = document.querySelector('.profile__paragraph-text');
const profilePopup = document.querySelector('.popup_type_add-profile');
const imagePopup = document.querySelector('.popup_type_add-image');
const cardPopup = document.querySelector('.popup_type_add-card'); 
const popupCloseButton = imagePopup.querySelector('.popup__close');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const imageElement = document.querySelector('.popup__item-image');


const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  inputErrorClass: 'popup__form-item_type_error',
  errorMessageClass: 'popup__form-item-error_opened',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
}

const cardValidator = new FormValidator(validateConfig, cardPopupForm);
const profileValidator = new FormValidator(validateConfig, profilePopupForm);

cardValidator.enableValidation();
profileValidator.enableValidation();

function createCard(data) {
  const card = new Card(data, '#card-template', () => openImagePopup(data));
  const cardElement = card.createCardElement();
  
  return cardElement;
}

function render(data, toBeginning = true, wrapPlace) {
  const cardElement = createCard(data);
 
  if (toBeginning) {
    wrapPlace.append(cardElement);
  } else {
    wrapPlace.prepend(cardElement);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", clickOverlaykHandler);
  document.removeEventListener('keydown', escPressHandler);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("click", clickOverlaykHandler);
  document.addEventListener('keydown', escPressHandler);
}

function escPressHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function clickOverlaykHandler(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = evt.currentTarget;
    closePopup(popup);
  }
}

function openImagePopup(data) {
  imageElement.src = data.link;
  imageElement.alt = data.name;
  imagePopup.querySelector('.popup__item-caption').textContent = data.name;

  openPopup(imagePopup);
}

function bindProfilePopupEvents() {
  const popupCloseButton = profilePopup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
  });
  profilePopupForm.addEventListener('submit', function(evt) {
    formSubmitHandler(evt);
  });
}

function profileButtonClickHandler() {
  const profileName = profilePopup.querySelector('.popup__form-item_type_person-name');
  const profileJob = profilePopup.querySelector('.popup__form-item_type_job');
  profileName.value = name.textContent;
  profileJob.value = job.textContent;
  profileValidator.resetValidation();
  openPopup(profilePopup);
}

function bindCardPopupEvents() {
  const popupCloseButton = cardPopup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function() {
    closePopup(cardPopup);
  });
  cardPopupForm.addEventListener('submit', newCardSubmitHandler);
}

function addCardClickHandler() {
  cardPopupForm.reset();
  cardValidator.resetValidation();
  openPopup(cardPopup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const data = new FormData(evt.target);
  name.textContent = data.get('person-name');
  job.textContent = data.get('job');
  closePopup(profilePopup);
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();

  const form = new FormData(evt.target);
  const name = form.get('place-name');
  const link = form.get('link');
  
  render({
      link,
      name
    }, false, cardsContainer);

  closePopup(cardPopup);
}

initialCards.forEach((data) => {
  render(data, true, cardsContainer);
})

profileEditButton.addEventListener('click', profileButtonClickHandler);
bindProfilePopupEvents();

profileAddButton.addEventListener('click', addCardClickHandler);
bindCardPopupEvents();

popupCloseButton.addEventListener('click', () => closePopup(imagePopup));
