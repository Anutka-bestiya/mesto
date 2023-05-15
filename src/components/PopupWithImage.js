import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigImage = this._popup.querySelector('.image-popup__image');
    this._bigName = this._popup.querySelector('.image-popup__title');
  }

  open(name, link) {
    super.open();

    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._bigName.textContent = name;
  }
}
