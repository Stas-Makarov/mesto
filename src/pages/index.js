import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
        settings,
        cardsContainerSelector,
        profilePopupSelector,
        imagePopupSelector,
        cardPopupSelector,
        profileEditButton,
        profileAddButton, 
        validateConfig,
        avatarPopupSelector,
        avatarEditButton,
        confirmPopupSelector 
        } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm';
import Api from '../scripts/components/Api';

function render(data, ownerId) {
  const cardElement = createCard(data, ownerId);
  cardSection.addItem(cardElement, true);
}

const cardSection = new Section({ renderer: render }, cardsContainerSelector);

function initCards(cards, ownerId) {
  cardSection.renderItems(cards, ownerId);
}

const profileData = new UserInfo({
  nameSelector: '.profile__heading-text', 
  jobSelector: '.profile__paragraph-text',
  avatarSelector: '.profile__avatar'
});

function initProfile(data) {
  profileData.setUserInfo(data);
}

const api = new Api(settings);

Promise.all([
  api.getInitialCards(),
  api.getUserInfo()
])
  .then(([cards, profileInfo]) => {
    initCards(cards, profileInfo._id);
    initProfile(profileInfo);
  });

const cardPopup = new PopupWithForm(cardPopupSelector, newCardSubmitHandler);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, formSubmitHandler);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, avatarSubmitHandler);
avatarPopup.setEventListeners();

const popupWithConfirm = new PopupWithConfirm(confirmPopupSelector, api); 
popupWithConfirm.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const cardValidator = new FormValidator(validateConfig, cardPopup.getForm());
const profileValidator = new FormValidator(validateConfig, profilePopup.getForm());
const avatarValidator = new FormValidator(validateConfig, avatarPopup.getForm());

function createCard(data, ownerId) {
  const card = new Card(data, '#card-template', openImagePopup);
  const cardElement = card.createCardElement(ownerId);
  
  return cardElement;
}
  
function openImagePopup(data) {
  imagePopup.open(data);
}

function addCardClickHandler() {
  cardValidator.resetValidation();
  cardPopup.open();
}

function newCardSubmitHandler(data) {
  const name = data['name'];
  const link = data['link'];
  api.addNewCard(data)
    .then(({name, link}) =>{
      const cardElement = createCard({name, link});
      cardSection.addItem(cardElement, false);
    });
}

function formSubmitHandler(data) {
  function profileUpdate(data) {
    profileData.editUserInfo(data);
  }
  
  api.updateUserInfo(data)
    .then(profileUpdate(data)); 
}

function profileButtonClickHandler() { 
  const userData = profileData.getUserInfo();
  profilePopup.setInputValues(userData);
  profileValidator.resetValidation();
  profilePopup.open();
}

function avatarSubmitHandler(data) {
  function updateAva(data) {
    profileData.avatar.updateAvatar(data);
  }
  
  api.editAvatar(data)
    .then(updateAva(data)); 
}

function editAvatarClickHandler() {
  avatarValidator.resetValidation();
  avatarPopup.open();
}

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();

profileEditButton.addEventListener('click', profileButtonClickHandler);
profileAddButton.addEventListener('click', addCardClickHandler);
avatarEditButton.addEventListener('click', editAvatarClickHandler);