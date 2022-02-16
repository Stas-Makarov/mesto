const templateItem = document.querySelector('#card-template').content;
const cards = document.querySelector('.elements-grid');
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const name = document.querySelector('.profile__heading-text');
const job = document.querySelector('.profile__paragraph-text');
const itemsList = document.querySelector('.elements-grid');
const profilePopup = document.querySelector('.popup_type_add-profile');
const imagePopup = document.querySelector('.popup_type_add-image');
const cardPopup = document.querySelector('.popup_type_add-card'); 
const popupCloseButton = imagePopup.querySelector('.popup__close');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const imageElement = document.querySelector('.popup__item-image');

function createCardElement(card) {
  const cardElement = templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements-grid__item-image');
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector('.elements-grid__item-text').textContent = card.name;

  const deleteButton = cardElement.querySelector('.elements-grid__item-delete');
  deleteButton.addEventListener('click', deleteCard);

  imageElement.addEventListener('click', function () {
    openImagePopup(card.link, card.name);
  });
  
  const likeButton = cardElement.querySelector('.elements-grid__item-like');
  likeButton.addEventListener('click', likeButtonClickHandler);

  return cardElement;
}

function renderItem(card, toBeginning = true) {
  const cardElement = createCardElement(card);
  if (toBeginning) {
    cards.prepend(cardElement);
  } else {
    cards.append(cardElement);
  }
}

function render() {
  initialCards.forEach((card) => renderItem(card, false));
}

function deleteCard(evt) {
  const listItem = evt.target.closest('.elements-grid__item-container');
  listItem.remove();
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

function openImagePopup(imageUrl, caption) {
  imageElement.src = imageUrl;
  imageElement.alt = caption;
  imagePopup.querySelector('.popup__item-caption').textContent = caption;
  openPopup(imagePopup);
}

function bindProfilePopupEvents() {
  const popupCloseButton = profilePopup.querySelector('.popup__close');
  const form = profilePopup.querySelector('.popup__form');
  popupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
  });
  form.addEventListener('submit', function(evt) {
    formSubmitHandler(evt);
  });
}

function profileButtonClickHandler() {
  const profileName = profilePopup.querySelector('.popup__form-item_type_person-name');
  const profileJob = profilePopup.querySelector('.popup__form-item_type_job');
  profileName.value = name.textContent;
  profileJob.value = job.textContent;
  resetErrors(profilePopup);
  checkButtonDisabled(profilePopup);
  openPopup(profilePopup);
}

function resetErrors(popup) {

  const errorsList = popup.querySelectorAll('.popup__form-item-error');
  errorsList.forEach((element) => {
    element.textContent = '';
  });
  
  const errorTypeElement = popup.querySelectorAll('.popup__form-item');
  errorTypeElement.forEach((element) => {
    element.classList.remove('popup__form-item_type_error');
  });
}

function checkButtonDisabled (popup) {
  const popupForm = popup.querySelector('.popup__form');
  const button = popup.querySelector('.popup__save-button');
  if (popupForm.checkValidity()) {
      button.disabled = false;
      button.classList.remove('popup__save-button_disabled');
  } else {
      button.disabled = true; 
      button.classList.add('popup__save-button_disabled');
  }
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
  resetErrors(cardPopup);
  checkButtonDisabled(cardPopup);
  openPopup(cardPopup);
}

function likeButtonClickHandler(evt) {
  const target = evt.target;
  target.classList.toggle('elements-grid__item-like_active');
};

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
  
  renderItem({
    link,
    name
  });

  closePopup(cardPopup);
}

render();

profileEditButton.addEventListener('click', profileButtonClickHandler);
bindProfilePopupEvents();

profileAddButton.addEventListener('click', addCardClickHandler);
bindCardPopupEvents();

popupCloseButton.addEventListener('click', () => closePopup(imagePopup));
