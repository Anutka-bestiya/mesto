export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupList = document.querySelectorAll(popupSelector);
    this._btnClose = this._popup.querySelector(`${popupSelector}__close-button`);
    this._btnOpen = document.querySelector(`${popupSelector}-open`);
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

  open = () => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleMouseClose);
    // this._btnOpen.addEventListener('click', this.open);
    this._btnClose.addEventListener('click', this.close);
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open = (name, link) => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

    const bigImage = this._popup.querySelector('.image-popup__image');
    const bigName = this._popup.querySelector('.image-popup__title');

    bigImage.src = link;
    bigImage.alt = name;
    bigName.textContent = name;
  };
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, buttonSubmit) {
    super(popupSelector);
    this._buttonSubmit = buttonSubmit;
  }

  _getInputValues = () => {
    const inputList = this._popup.querySelectorAll('.form__input');
  };

  //     Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
}
