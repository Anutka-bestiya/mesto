import { Popup } from '../components/Popup.js'

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
