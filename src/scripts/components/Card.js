export default class Card {
    constructor (data, cardTemplateSelector, handelImageClick, handleDeleteClick, handleLikeClick) {
        this._data = data;
        this._templateItem = document.querySelector(cardTemplateSelector).content;
        this._handelImageClick = handelImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    isLiked() {
        const userHasLikedCard = this._data.likes.find(user => user._id === this._data._id);
        if (userHasLikedCard) {
            this._handleLikeIcon();
        } 
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        this._likeCounter = this._cardElement.querySelector('.elements-grid__item-like-counter');
        this._likeCounter.textContent = this._data.likes.length;

        if (this.isLiked()) {
            this._fillLikeIcon();
        } else {
            this._deleteLikeIcon();
        }       
    }

    _fillLikeIcon() {
        this._likeButton.classList.add('elements-grid__item-like_active');
    }

    _deleteLikeIcon() {
        this._likeButton.classList.remove('elements-grid__item-like_active');
    }

    updateLikeCount(count) {
        this._likeCounter.textContent = count;
    };

    _setEventListeners() {
        this._deleteButton = this._cardElement.querySelector('.elements-grid__item-delete');
        this._likeButton = this._cardElement.querySelector('.elements-grid__item-like');

        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._data._id));  
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._data._id));
        this._imageElement.addEventListener('click', () => this._handelImageClick(this._data));
    }

    createCardElement(ownerId) {
        this._cardElement = this._templateItem.querySelector('.elements-grid__item-container').cloneNode(true);
        this._imageElement = this._cardElement.querySelector('.elements-grid__item-image');
        
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._cardElement.querySelector('.elements-grid__item-text').textContent = this._data.name;
        this.setLikes(this._likes);
      
        this._setEventListeners();
        if (this._data.owner._id !== ownerId) {
            this._deleteButton.remove();
        }

        return this._cardElement;
      }
}