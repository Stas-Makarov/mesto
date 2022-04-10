export default class Api {
    constructor(settings) {
      this._baseUrl = settings.baseUrl;
      this._headerAuthorization = settings.headers.authorization;
      this._contentType = settings.headers['Content-Type'];
      }
  
    _checkResponse(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
            }
          })
      .then(this._checkResponse); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
            },
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
        },
        body: JSON.stringify(data) 
      })
      .then(this._checkResponse);
    }
  
    putLike(id) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
        },
        body: JSON.stringify(data)
        })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._headerAuthorization,
            'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
    }
  }