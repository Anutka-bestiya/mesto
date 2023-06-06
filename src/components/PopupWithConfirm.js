import { Popup } from '../components/Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._saveBatton = this._popup.querySelector('.popup__button');
  }

  open(id, func) {
    super.open();
    this._id = id;
    this._func = func;
  }

  changeConfirmBatton(text) {
    this._saveBatton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._id, this._func);
    });
  }
}
