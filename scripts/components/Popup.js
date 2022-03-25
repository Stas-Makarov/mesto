export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener("click", this._handleClickOverlay);
        this._popupCloseButton.addEventListener('click', this._handleButtonClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener("click", this._handleClickOverlay);
        this._popupCloseButton.removeEventListener('click', this._handleButtonClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this._popup = evt.currentTarget;
            this.close();
          }
    }

    _handleButtonClose = () => {
        this.close();
    }
}