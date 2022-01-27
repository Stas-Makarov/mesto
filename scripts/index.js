const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const profileEditButton = document.querySelector('.profile__edit-button');
let name = document.querySelector('.profile__heading-text');
let job = document.querySelector('.profile__paragraph-text');
const inputs = formElement.elements;

function popupOpen() {
    inputs['name'].value =  name.textContent;
    inputs['job'].value = job.textContent;
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    name.textContent = data.get('name');
    job.textContent = data.get('job');
    popupClose();
}

profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 