import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  initialCards,
  cardsContainerSelector,
  profilePopupSelector,
  imagePopupSelector,
  cardPopupSelector,
  profileEditButton,
  profileAddButton, 
  validateConfig
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

 const cardSection = new Section({ data: initialCards , renderer: render }, cardsContainerSelector);
 cardSection.renderItems();

const cardPopup = new PopupWithForm(cardPopupSelector, newCardSubmitHandler);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, formSubmitHandler);
profilePopup.setEventListeners();
const profileData = new UserInfo({
  nameSelector: '.profile__heading-text', 
  jobSelector: '.profile__paragraph-text'
});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const cardValidator = new FormValidator(validateConfig, cardPopup.getForm());
const profileValidator = new FormValidator(validateConfig, profilePopup.getForm());

function createCard(data) {
  const card = new Card(data, '#card-template', openImagePopup);
  const cardElement = card.createCardElement();
  
  return cardElement;
}

function render(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement, true);
}
  
function openImagePopup(data) {
  imagePopup.open(data);
}

function addCardClickHandler() {
  cardValidator.resetValidation();
  cardPopup.open();
}

function newCardSubmitHandler(data) {
  const name = data['place-name'];
  const link = data['link'];
  
  const cardElement = createCard({name, link});
  cardSection.addItem(cardElement, false);
}

function formSubmitHandler(data) {
  profileData.setUserInfo(data);
}

function profileButtonClickHandler() { 
  const userData = profileData.getUserInfo();
  profilePopup.setInputValues(userData);
  profileValidator.resetValidation();
  profilePopup.open();
}

cardValidator.enableValidation();
profileValidator.enableValidation();

profileEditButton.addEventListener('click', profileButtonClickHandler);
profileAddButton.addEventListener('click', addCardClickHandler)

