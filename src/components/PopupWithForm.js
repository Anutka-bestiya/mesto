import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleFormOpen) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormOpen = handleFormOpen;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._saveBatton = this._popup.querySelector('.popup__button');
  }

  _getInputValues = () => {
    this._inputValue = {};
    this._inputList.forEach(input => (this._inputValue[input.name] = input.value));

    return this._inputValue;
  };

  //   _handleFormSubmit = () => {};

  open() {
    super.open();
    this._handleFormOpen();
  }

  close() {
    super.close();
    this._form.reset();
  }

  saveFormFinal(textSaveBatton) {
    this._saveBatton.textContent = textSaveBatton;
  }

  _saveForm() {
    this._saveBatton.textContent = 'Сохранение...';
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', event => {
      event.preventDefault();
      this._saveForm();
      const textSaveBatton = this._saveBatton.textContent;
      this.saveFormFinal(textSaveBatton);
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
