const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', function (evt){
    evt.preventDefault()
    popup.classList.add('popup__open');
});

popupCloseButton.addEventListener('click', function (){
    popup.classList.remove('popup__open');
});



let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name="name"]');
let jobInput = formElement.querySelector('[name="job"]');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    let name = document.getElementsByClassName('.profile__heading-text')
    nameInput.value.add.name.textContent;


    document.querySelector('.profile__heading-text') = nameInput.value.textContent; 
    jobInput.value.textContent 
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 