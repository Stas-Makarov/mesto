const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', function (evt){
    evt.preventDefault()
    popup.classList.add('popup__open');
});

profileAddButton.addEventListener('click', function (evt){
    evt.preventDefault()
    popup.classList.add('popup__open');
});

popupCloseButton.addEventListener('click', function (){
    popup.classList.remove('popup__open');
});