import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, api) {
        super(popupSelector); 
        this._api = api;
        super.setEventListeners();
    }

    open() {
      super.open();
      this._popup.addEventListener('submit', this._deleteCard);
      this._id = id;
      this._element = element;
    }
    
    _deleteCard = (evt) => {
        evt.preventDefault();
        this._api(this._id, this._element);
    }

    close() {
      super.close();
      this._popup.removeEventListener('submit', this._deleteCard);
    }
}