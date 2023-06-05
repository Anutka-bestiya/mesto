export class Api {
  constructor(options) {
    // тело конструктора
    //   baseUrl: 'https://nomoreparties.co/v1/cohort-66',
    //   headers: {
    //     authorization: '8629910e-8349-4959-825d-5e9f5cf99f3f',
    //     'Content-Type': 'application/json'
    //   }
    (this._baseUrl = options.baseUrl), (this._headers = options.headers);
  }

  _res(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  //запрос и изменение данных о пользователе
  getUserInfoServe() {
    return fetch(this._baseUrl + '/users/me', {
      headers: { authorization: this._headers.authorization }
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  setUserInfoServe({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  setUserAvatarServe({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  //запрос карточек
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: { authorization: this._headers.authorization }
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  saveNewCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._res(res))
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._res(res))
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._res(res))
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => {
        console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
      });
  }
}
