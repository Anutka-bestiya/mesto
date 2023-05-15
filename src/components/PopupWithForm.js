import { Popup } from '../components/Popup.js';

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
