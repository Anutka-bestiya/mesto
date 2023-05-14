export class UserInfo {
  constructor(nameUserSelector, aboutUserSelector) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameUser.textContent,
      userAbout: this._aboutUser.textContent
    };
  }

  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._aboutUser.textContent = data.about;
  }
}
