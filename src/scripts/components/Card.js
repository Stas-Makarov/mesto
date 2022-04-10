export default class Card {
    constructor (data, cardTemplateSelector, handelImageClick) {
        this._data = data;
        this._templateItem = document.querySelector(cardTemplateSelector).content;
        this._handelImageClick = handelImageClick;
    }

    _deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _likeButtonClickHandler = () => {
        this._likeButton.classList.toggle('elements-grid__item-like_active');
    };

    _setEventListeners() {
        this._deleteButton = this._cardElement.querySelector('.elements-grid__item-delete');
        this._likeButton = this._cardElement.querySelector('.elements-grid__item-like');

        this._deleteButton.addEventListener('click', this._deleteCard);  
        this._likeButton.addEventListener('click', this._likeButtonClickHandler);
        this._imageElement.addEventListener('click', () => this._handelImageClick(this._data));
    }

    createCardElement(ownerId) {
        this._cardElement = this._templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
        this._imageElement = this._cardElement.querySelector('.elements-grid__item-image');
        
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._cardElement.querySelector('.elements-grid__item-text').textContent = this._data.name;
      
        this._setEventListeners();
        if (this._data.owner._id !== ownerId) {
            this._deleteButton.remove();
        }

        return this._cardElement;
      }
}