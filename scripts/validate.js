const form = document.querySelector('.popup__form');

const formSubmit = (event) => {
    event.preventDefault();
}

const checkInputValidity = (config, form, input) => {
    const errorMessage = form.querySelector(`.popup__form-item-error_type_${input.name}`);
    
    if (input.validity.valid) {
        errorMessage.textContent = '';
        input.classList.remove(config.inputErrorClass);
    } else {
        errorMessage.textContent = input.validationMessage;
        input.classList.add(config.inputErrorClass);
    }
}

const checkButtonValidity = (config, form, button) => {
    if (form.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove(config.disabledButtonClass);
    } else {
        button.setAttribute('disabled', '');
        button.classList.add(config.disabledButtonClass);
    }

}

function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
        
    formList.forEach((item) => {
        item.addEventListener('submit', formSubmit);
        
        const inputs = item.querySelectorAll(config.inputSelector);
        const button = item.querySelector(config.buttonSelector);
        
        checkButtonValidity(config, item, button);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(config, item, input);
            checkButtonValidity(config, item, button);
        });
    });
});   
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    inputErrorClass: 'popup__form-item_type_error',
    buttonSelector: '.popup__save-button',
    disabledButtonClass: 'popup__save-button_disabled',
});