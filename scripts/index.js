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
const templateItem = document.querySelector('#template__item').content;
const cards = document.querySelector('.elements-grid');
const templatePopup = document.querySelector('#template__popup').content;
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
let name = document.querySelector('.profile__heading-text');
let job = document.querySelector('.profile__paragraph-text');
const itemsList = document.querySelector('.elements-grid');
const createButton = templatePopup.querySelector('.popup__save-button');
const openImageButton = templateItem.querySelector('.elements-grid__item-image');
const imagePopupContainer = document.querySelector('#template__image-popup').content;
const imagePopup = document.querySelector('.image-popup');

function renderItem(card) {
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

  cards.append(cardElement);
}

function deleteCard(evt) {
  const listItem = evt.target.closest('.elements-grid__item-container');
  listItem.remove();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function addNewCardItem(link, name) {
  const newElement = templateItem.querySelector('.elements-grid__item-container').cloneNode(true);

  newElement.querySelector('.elements-grid__item-image').src = link;
  newElement.querySelector('.elements-grid__item-image').alt = link;
  newElement.querySelector('.elements-grid__item-text').textContent = name;

  cards.prepend(newElement);
}

function openImagePopup(imageUrl, caption) {
  const imagePopupElement = imagePopupContainer.querySelector('.image-popup__container').cloneNode(true);
  const previewImageElement = imagePopupElement.querySelector('.image-popup__item-image');
  const closeImageButton = imagePopupElement.querySelector('.image-popup__close');

  previewImageElement.src = imageUrl;
  previewImageElement.alt = caption;
  imagePopupElement.querySelector('.image-popup__item-caption').textContent = caption;

  closeImageButton.addEventListener('click', closePopupImage);
  imagePopup.classList.add('image-popup_opened');
  imagePopup.innerHTML = '';

  imagePopup.append(imagePopupElement);
}

function closePopupImage() {
  imagePopup.classList.remove('image-popup_opened');
}

function render() {
  initialCards.forEach(renderItem);
}

function profileButtonClickHandler() {
  const newElement = templatePopup.querySelector('.popup__container').cloneNode(true);

  newElement.querySelector('.popup__title').textContent = 'Редактировать';
  newElement.querySelector('.popup__save-button').textContent = 'Сохранить';

  const form = newElement.querySelector('.popup__form');
  form.elements['name'].value = name.textContent;
  form.elements['job'].value = job.textContent;

  const popupCloseButton = newElement.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
  form.addEventListener('submit', formSubmitHandler);

  popup.classList.add('popup_opened');
  popup.innerHTML = '';
  popup.append(newElement);
}

function addCardClickHandler() {
  const newElement = templatePopup.querySelector('.popup__container').cloneNode(true);

  newElement.querySelector('.popup__title').textContent = 'Новое место';
  newElement.querySelector('.popup__save-button').textContent = 'Создать';

  const form = newElement.querySelector('.popup__form');
  form.elements['name'].placeholder = 'Название';
  form.elements['job'].placeholder = 'Ссылка на картинку';

  const popupCloseButton = newElement.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closePopup);
  form.addEventListener('submit', newCardSubmitHandler);

  popup.classList.add('popup_opened');
  popup.innerHTML = '';
  popup.append(newElement);
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
  closePopup();
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();

  const form = new FormData(evt.target);
  let name = form.get('name');
  let link = form.get('job');

  addNewCardItem(link, name);
  closePopup();

}

render();


profileEditButton.addEventListener('click', profileButtonClickHandler);
profileAddButton.addEventListener('click', addCardClickHandler);
itemsList.addEventListener('click', likeButtonClickHandler);
createButton.addEventListener('click', addNewCardItem);