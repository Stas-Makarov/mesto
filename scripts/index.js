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

function renderItem(el) {
    const newElement = templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
    newElement.querySelector('.elements-grid__item-image').src = el.link;
    newElement.querySelector('.elements-grid__item-image').alt = el.name;
    newElement.querySelector('.elements-grid__item-text').textContent = el.name;
    cards.append(newElement);
}

function render() {
    initialCards.forEach(renderItem);
}

render();

//открытие и закрытие попапов редактирования и добавления
const templatePopup = document.querySelector('#template__popup').content;
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
let name = document.querySelector('.profile__heading-text');
let job = document.querySelector('.profile__paragraph-text');

function openEditProfile() {
    const newElement = templatePopup.querySelector('.popup__container').cloneNode(true);

    newElement.querySelector('.popup__title').textContent = 'Редактировать';
    newElement.querySelector('.popup__save-button').textContent = 'Сохранить';
       
    const form = newElement.querySelector('.popup__form');
    form.elements['name'].value = name.textContent;
    form.elements['job'].value = job.textContent;
    
    const popupCloseButton = newElement.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closePopup);

    popup.classList.add('popup_opened');
    popup.innerHTML = '';
    popup.append(newElement);
}

function openAddCard() {
    const newElement = templatePopup.querySelector('.popup__container').cloneNode(true);
    
    newElement.querySelector('.popup__title').textContent = 'Новое место';
    newElement.querySelector('.popup__save-button').textContent = 'Создать';
    
    const form = newElement.querySelector('.popup__form');
    form.elements['name'].placeholder = 'Название';
    form.elements['job'].placeholder = 'Ссылка на картинку';
    
    const popupCloseButton = newElement.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closePopup);

    popup.classList.add('popup_opened');
    popup.innerHTML = '';
    popup.append(newElement);
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openEditProfile);
profileAddButton.addEventListener('click', openAddCard);


// активация лайка
const itemsList = document.querySelector('.elements-grid');

function activeLikeButton(evt) {
    const target = evt.target; 
    if (target.classList.contains('elements-grid__item-like')) {
        target.classList.toggle('elements-grid__item-like_active');
    }
};

itemsList.addEventListener('click', activeLikeButton);



// редактирование профиля
const popupSaveButton = templatePopup.querySelector('.popup__save-button');

function formSubmitHandler(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    name.textContent = data.get('name');
    job.textContent = data.get('job');
    closePopup();
}

popupSaveButton.addEventListener('submit', formSubmitHandler); 


// удаление, добавление карточек
const deleteButton = document.querySelector('.elements-grid__item-delete');

function deleteCardItem(event) {
    event.target.closest('.elements-grid__item-container').remove();
}

deleteButton.addEventListener('click', deleteCardItem);

const createButton = templatePopup.querySelector('.popup__save-button');

function addNewCardItem(link, name) {
    const newElement = templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
    newElement.querySelector('.elements-grid__item-image').src = link;
    newElement.querySelector('.elements-grid__item-image').alt = link;
    newElement.querySelector('.elements-grid__item-text').textContent = name;
    cards.prepend(newElement);
}

createButton.addEventListener('submit', addNewCardItem);


// открытие, закрытие попапов изображений