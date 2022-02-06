const templateItem = document.querySelector('#template__item').content;
const cards = document.querySelector('.elements-grid');
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const name = document.querySelector('.profile__heading-text');
const job = document.querySelector('.profile__paragraph-text');
const itemsList = document.querySelector('.elements-grid');
const profilePopup = document.querySelector('.popup_js_profile');
const imagePopup = document.querySelector('.popup_js-image');
const cardPopup = document.querySelector('.popup_js-card'); 

function createCardElement(card) {
  const cardElement = templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements-grid__item-image');
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector('.elements-grid__item-text').textContent = card.name;

  const deleteButton = cardElement.querySelector('.elements-grid__item-delete');
  deleteButton.addEventListener('click', deleteCard);
  imageElement.addEventListener('click', function (evt) {
    openImagePopup(card.link, card.name);
  });
  itemsList.addEventListener('click', likeButtonClickHandler);
  
  return cardElement;
}

function renderItem(card) {
  const cardElement = createCardElement(card);
  cards.append(cardElement);
}

function render() {
  initialCards.forEach(renderItem);
}

function deleteCard(evt) {
  const listItem = evt.target.closest('.elements-grid__item-container');
  listItem.remove();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function bindImagePopupEvents() {
  const popupCloseButton = imagePopup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function() {
    closePopup(imagePopup);
  });
}

function openImagePopup(imageUrl, caption) {
  const imageElement = document.querySelector('.popup__item-image');
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
  form.addEventListener('submit', formSubmitHandler);
}

function profileButtonClickHandler() {
  const form = profilePopup.querySelector('.popup__form');
  form.elements['name'].value = name.textContent;
  form.elements['job'].value = job.textContent;
  openPopup(profilePopup);
}

function bindCardPopupEvents() {
  const popupCloseButton = cardPopup.querySelector('.popup__close');
  const form = cardPopup.querySelector('.popup__form');
  popupCloseButton.addEventListener('click', function() {
    closePopup(cardPopup);
  });
  form.addEventListener('submit', newCardSubmitHandler);
}

function addCardClickHandler() {
  const form = cardPopup.querySelector('.popup__form');
  form.elements['name'].value = '';
  form.elements['link'].value = '';
  openPopup(cardPopup);
}

function likeButtonClickHandler(evt) {
  const target = evt.target;
  if (target.classList.contains('elements-grid__item-like')) {
    target.classList.toggle('elements-grid__item-like_active');
  }
};

function formSubmitHandler(evt) {
  evt.preventDefault();

  const data = new FormData(evt.target);
  name.textContent = data.get('name');
  job.textContent = data.get('job');
  closePopup(profilePopup);
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();

  const form = new FormData(evt.target);
  let name = form.get('name');
  let link = form.get('job');

  const cardElement = createCardElement({
    link,
    name
  });

  cards.prepend(cardElement);
  closePopup(cardPopup);

}

render();


profileEditButton.addEventListener('click', profileButtonClickHandler);
bindProfilePopupEvents();

profileAddButton.addEventListener('click', addCardClickHandler);
bindCardPopupEvents();

//itemsList.addEventListener('click', likeButtonClickHandler);
bindImagePopupEvents();