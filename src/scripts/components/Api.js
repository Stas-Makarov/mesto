export default class Api {
    constructor(settings) {
      this._baseUrl = settings.baseUrl;
      this._headers = settings.headers;
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
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data) 
      })
      .then(this._checkResponse);
    }
  
    putLike(id) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  }