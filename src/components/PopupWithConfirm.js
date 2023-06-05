import { Popup } from '../components/Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  //   _handleFormSubmit = () => {};
  open(id) {
    super.open();
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      this._handleFormSubmit(this._id);
      this.close();
    });
  }
}
