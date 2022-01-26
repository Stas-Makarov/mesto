const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

let name = document.querySelector('.profile__heading-text');
let job = document.querySelector('.profile__paragraph-text');


function popupOpen() {
    const inputs = formElement.elements;
    inputs['name'].value =  name.textContent;
    inputs['job'].value = job.textContent;
    popup.classList.add('popup__open');
}

function popupClose() {
    popup.classList.remove('popup__open');
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