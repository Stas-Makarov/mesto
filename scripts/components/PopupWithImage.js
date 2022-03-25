import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, data) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__item-image');
        this._caption = this._popup.querySelector('.popup__item-caption');
        this._data = data;
    }

    open(data) {
        this._image.src = this._data.link;
        this._image.alt = this._data.name;
        this._caption.textContent = this._data.name;

        super.open();
    }

    close() {
        super.close();
    }
}