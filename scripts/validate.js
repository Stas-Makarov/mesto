
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
        const inputs = item.querySelectorAll(config.inputSelector);
        const button = item.querySelector(config.buttonSelector);
        
        checkButtonValidity(config, item, button);

        const form = document.querySelector(config.formSelector);    

        inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(config, item, input);
            checkButtonValidity(config, item, button);
        });
    });
});   
}