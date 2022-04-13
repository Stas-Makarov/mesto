export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._data = {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
            avatar: this._profileAvatar.src
         };

         return this._data;
      }
    
    setUserInfo({ name, about, avatar }) {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileAvatar.src = avatar;
    }
}