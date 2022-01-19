const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

profileEditButton.addEventListener('click', function() {
    popup.classList.add('popup__open');
});

popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup__open');
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    let nameReplace = document.querySelector('.profile__heading-text');
    let jobReplace = document.querySelector('.profile__paragraph-text');
     nameReplace.textContent = data.get('name');
    jobReplace.textContent = data.get('job');
    popup.classList.remove('popup__open');
}

formElement.addEventListener('submit', formSubmitHandler); 