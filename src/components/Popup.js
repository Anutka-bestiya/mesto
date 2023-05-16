export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._btnClose = this._popup.querySelector('.button-close');
  }

  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleMouseClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleMouseClose);
    this._btnClose.addEventListener('click', this.close.bind(this));
  }
}
