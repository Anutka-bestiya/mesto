export class UserInfo {
  constructor(nameUserSelector, aboutUserSelector, avatarUserSelector) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatarUser = document.querySelector(avatarUserSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameUser.textContent,
      userAbout: this._aboutUser.textContent,
      userAvatar: this._avatarUser.src
    };
  }

  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._aboutUser.textContent = data.about;
    this._idUser = data._id;
  }
  setUserAvatar(data) {
    this._avatarUser.src = data.avatar;
  }
}
