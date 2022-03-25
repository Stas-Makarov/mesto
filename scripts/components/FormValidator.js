export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._button = this._form.querySelector(this._settings.buttonSelector);
        this._inputList = this._form.querySelectorAll(this._settings.inputSelector);       
    }

    _showInputError(input) {
        const errorMessage = this._form.querySelector(`.popup__form-item-error_type_${input.name}`);
        errorMessage.textContent = input.validationMessage;
        input.classList.add(this._settings.inputErrorClass);
    } 
    
    _hideInputError(input) {
        const errorMessage = this._form.querySelector(`.popup__form-item-error_type_${input.name}`);
        errorMessage.textContent = '';
        input.classList.remove(this._settings.inputErrorClass);
    }

    _checkInputValidity(input) {        
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    }
    
    checkButtonValidity () {
        if (this._form.checkValidity()) {
            this._button.removeAttribute('disabled');
            this._button.classList.remove(this._settings.disabledButtonClass);
        } else {
            this._button.setAttribute('disabled', ''); 
            this._button.classList.add(this._settings.disabledButtonClass);
        }
    }

    enableValidation () {    
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.checkButtonValidity(this.button);
            });
        });
    }

    resetValidation() {
        this.checkButtonValidity(this.button); 
  
        this._inputList.forEach((input) => {
          this._hideInputError(input);
        });
      }
}