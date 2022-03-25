export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
    }

    getUserInfo() {
        this._data = {
            'person-name': this._profileName.textContent,
            job: this._profileJob.textContent
         };
   
         return this._data;
      }
    
    setUserInfo({ 'person-name': name, job }) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}