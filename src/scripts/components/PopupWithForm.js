import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs =  this._form.querySelectorAll('.popup__form-item');
        this._submitButton = this._form.querySelector('.popup__save-button');
    }

    _getInputValues() {
        this._inputList = {}
        this._inputs.forEach(input => {
          this._inputList[input.name] = input.value;
        });

        return this._inputList;
      }

    getForm() {
        return this._form;
    }

    renderLoading(isLoading, text) {
      if(isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      }
      else {
        this._submitButton.textContent = text;
      }
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }

    setInputValues(data) {
        this._inputs.forEach(input => {
            input.value = data[input.name];
          });
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  
    close() {
      this._form.reset();
      super.close();
    }
}