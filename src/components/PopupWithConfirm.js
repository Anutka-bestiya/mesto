import { Popup } from '../components/Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._saveBatton = this._popup.querySelector('.popup__button');
  }

  open(id, card) {
    super.open();
    console.log(card);
    this._id = id;
    this._card = card;
  }

  changeConfirmBatton(text) {
    this._saveBatton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      console.log(this._card);
      this._handleFormSubmit(this._id, this._card);
    });
  }
}
