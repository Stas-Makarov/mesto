export class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
        this.button = this.form.querySelector(this.settings.buttonSelector);
    }

    _checkInputValidity (input) {
        const errorMessage = this.form.querySelector(`.popup__form-item-error_type_${input.name}`);
        
        if (input.validity.valid) {
            errorMessage.textContent = '';
            input.classList.remove(this.settings.inputErrorClass);
        } else {
            errorMessage.textContent = input.validationMessage;
            input.classList.add(this.settings.inputErrorClass);
        }
    }
    
    _checkButtonValidity () {
        if (this.form.checkValidity()) {
            this.button.removeAttribute('disabled');
            this.button.classList.remove(this.settings.disabledButtonClass);
        } else {
            this.button.setAttribute('disabled', ''); 
            this.button.classList.add(this.settings.disabledButtonClass);
        }
    }

    enableValidation () { 
        const formList = Array.from(document.querySelectorAll(this.settings.formSelector));
        
        formList.forEach((item) => {
            const inputs = item.querySelectorAll(this.settings.inputSelector);       

            //this._checkButtonValidity(this.button);   
    
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._checkButtonValidity(this.button);
                });
            });
        });
    }
}