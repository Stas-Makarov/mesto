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
import Api from '../scripts/components/Api';

let ownerId;

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
  api.getInitialCards()
    .catch((err) => {
      console.log(err);
    }),
  api.getUserInfo()
    .catch((err) => {
      console.log(err);
    })
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

const popupWithConfirm = new PopupWithForm(confirmPopupSelector, ); 
popupWithConfirm.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const cardValidator = new FormValidator(validateConfig, cardPopup.getForm());
const profileValidator = new FormValidator(validateConfig, profilePopup.getForm());
const avatarValidator = new FormValidator(validateConfig, avatarPopup.getForm());

function createCard(data, ownerId) {
  const card = new Card(data, 
                        ownerId,
                        '#card-template', 
                        openImagePopup, 
                        (id) => {
                            popupWithConfirm.open();
                            popupWithConfirm.changeSubmitHandler(() =>{
                              popupWithConfirm.renderLoading(true, 'Да');
                              api.deleteCard(id)
                                .then(res =>{
                                  card.deleteCard();
                                  popupWithConfirm.close();
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                .finally(() =>
                                  popupWithConfirm.renderLoading(false, 'Да')
                                );
                              }); 
                        },
                        (id) => {
                            if (card.isLiked()) {
                              api.deleteLike(id)
                                .then((data) => {
                                  return data.likes.length
                                })
                                .then((data) => {
                                  card.updateLikeCount(data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                }
                               
                            else {
                              api.putLike(id)              
                                .then((data) => {
                                  return data.likes.length
                                })
                                .then((data) => {
                                  card.updateLikeCount(data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                              } 
                            }
                        );
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

function newCardSubmitHandler(data, ownerId) {
  cardPopup.renderLoading(true, 'Создать');
  api.addNewCard(data)
    .then((data) => {
      const cardElement = createCard(data, ownerId);
      cardSection.addItem(cardElement, false);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      cardPopup.renderLoading(false, 'Создать')
    );
}

function formSubmitHandler(data) {
  function profileUpdate(data) {
    profileData.editUserInfo(data);
  }
  profilePopup.renderLoading(true, 'Сохранить');
  api.updateUserInfo(data)
    .then(() => {
      profileUpdate(data)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      profilePopup.renderLoading(false, 'Сохранить')
    ); 
}

function profileButtonClickHandler() { 
  const userData = profileData.getUserInfo();
  profilePopup.setInputValues(userData);
  profileValidator.resetValidation();
  profilePopup.open();
}

function avatarSubmitHandler(data) { 
  avatarPopup.renderLoading(true, 'Сохранить');
  api.editAvatar(data)
    .then(profileData.updateAvatar(data))
    .then(() => {
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      avatarPopup.renderLoading(false, 'Сохранить')
    );
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