class Popup {
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
    this._btnClose.addEventListener('click', this.close);
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (name, link) => {
    // super.open();
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
  constructor(popupSelector, handleFormSubmit, handleFormOpen) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormOpen = handleFormOpen;
  }

  _getInputValues = () => {
    const inputList = this._popup.querySelectorAll('.form__input');
    this._inputValue = {};
    inputList.forEach(input => (this._inputValue[input.name] = input.value));
    console.log(this._inputValue);
    return this._inputValue;
  };

  //   _handleFormSubmit = () => {};

  open = () => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._handleFormOpen();
  };

  close = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

    const form = this._popup.querySelector('.form');

    form.reset();
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleMouseClose);
    this._btnOpen.addEventListener('click', this.open);
    this._btnClose.addEventListener('click', this.close);
    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
