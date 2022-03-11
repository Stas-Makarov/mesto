export class Card {
    constructor (data, cardTemplateSelector, handelImageClick) {
        this._data = data;
        this._templateItem = document.querySelector(cardTemplateSelector).content;
        this._handelImageClick = handelImageClick;
    }

    _deleteCard(evt) {
        const listItem = evt.target.closest('.elements-grid__item-container');
        listItem.remove();
    }

    _likeButtonClickHandler(evt) {
        const target = evt.target;
        target.classList.toggle('elements-grid__item-like_active');
    };

    _setEventListeners() {
        const deleteButton = this._cardElement.querySelector('.elements-grid__item-delete');
        const likeButton = this._cardElement.querySelector('.elements-grid__item-like');

        deleteButton.addEventListener('click', this._deleteCard);  
        likeButton.addEventListener('click', this._likeButtonClickHandler);
        this._imageElement.addEventListener('click', this._handelImageClick);
    }

    createCardElement() {
        this._cardElement = this._templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
        this._imageElement = this._cardElement.querySelector('.elements-grid__item-image');
        
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._cardElement.querySelector('.elements-grid__item-text').textContent = this._data.name;
      
        this._setEventListeners();
              
        return this._cardElement;
      }
}