export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._button = this._form.querySelector(this._settings.buttonSelector);
    }

    _checkInputValidity(input) {
        const errorMessage = this._form.querySelector(`.popup__form-item-error_type_${input.name}`);
        
        if (input.validity.valid) {
            errorMessage.textContent = '';
            input.classList.remove(this._settings.inputErrorClass);
        } else {
            errorMessage.textContent = input.validationMessage;
            input.classList.add(this._settings.inputErrorClass);
        }
    }
    
    _checkButtonValidity () {
        if (this._form.checkValidity()) {
            this._button.removeAttribute('disabled');
            this._button.classList.remove(this._settings.disabledButtonClass);
        } else {
            this._button.setAttribute('disabled', ''); 
            this._button.classList.add(this._settings.disabledButtonClass);
        }
    }

    enableValidation () { 
        const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
        
        formList.forEach((item) => {
            const inputs = item.querySelectorAll(this._settings.inputSelector);       
   
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._checkButtonValidity(this.button);
                });
            });
        });
    }
}