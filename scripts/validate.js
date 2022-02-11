const form = document.querySelector('.popup__form');

const formSubmit = (event) => {
    event.preventDefault();
}

const checkInputValidity = (form, input) => {
    const errorMessage = form.querySelector(`.popup__form-item_type_${input.name}-error`);
    console.log(errorMessage);
    if (input.validity.valid) {
        errorMessage.textContent = '';
        input.classList.remove('popup__form-item_type_error');
    } else {
        errorMessage.textContent = input.validationMessage;
        input.classList.add('popup__form-item_type_error');
    }
}

const checkButtonValidity = (form, button) => {
    if (form.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__save-button_disabled');
    } else {
        button.setAttribute('disabled', '');
        button.classList.add('popup__save-button_disabled');
    }

}

function enableValidation () {
    const form = document.querySelector('.popup__form');

    form.addEventListener('submit', formSubmit);

    const inputs = form.querySelectorAll('.popup__form-item');
    const button = form.querySelector('.popup__save-button');

    //checkButtonValidity(form, button);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input);
            checkButtonValidity(form, button);
        });
    })
}

enableValidation();