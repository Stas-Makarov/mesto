import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, ) {
        super(popupSelector);
          
    }

    open() {
      super.open();
      
    }
    
    _deleteCard = (evt) => {
        evt.preventDefault();
        
    }

    close() {
      super.close();
      
    }
}