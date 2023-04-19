// Класс Popup
export class Popup {
  constructor(popup, buttonOpen, buttonClose, buttonForm) {
    this._popup = popup;
    this._buttonOpen = buttonOpen;
    this._buttonClose = buttonClose;
    this._buttonForm = buttonForm;
  }

  _hasInvalidButton = () => {
    this._buttonForm.disabled = true;
    this._buttonForm.classList.add('popup__button_disabled');
  };

  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      const popupTarget = document.querySelector('.popup_opened');

      this.closePopup(popupTarget);
    }
  };

  closePopup = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleMouseClose);
  };

  _handleMouseClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  };

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._buttonClose.addEventListener('click', () => {
      this.closePopup();
    });
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMouseClose);
    this._hasInvalidButton();
  }

  eventListener = () => {
    this._buttonOpen.addEventListener('click', () => {
      this.openPopup();
    });
  };
}

export class EditPopup extends Popup {
  constructor(popup, buttonOpen, buttonClose, buttonForm, nameEl, aboutEl, inputName, inputAbout) {
    super(popup, buttonOpen, buttonClose, buttonForm);
    this._nameEl = nameEl;
    this._aboutEl = aboutEl;
    this._inputName = inputName;
    this._inputAbout = inputAbout;
  }

  _handleFormSubmit = event => {
    event.preventDefault();

    this._userName = this._inputName.value;
    this._userAbout = this._inputAbout.value;
    this._nameEl.textContent = this._userName;
    this._aboutEl.textContent = this._userAbout;

    this.closePopup();
  };

  openPopup() {
    super.openPopup();
    this._inputName.value = this._nameEl.textContent;
    this._inputAbout.value = this._aboutEl.textContent;
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }
}

export class FormAddPopup extends Popup {
  constructor(popup, buttonOpen, buttonClose, buttonForm, nameCard, linkCard) {
    super(popup, buttonOpen, buttonClose, buttonForm);
    this._nameCard = nameCard;
    this._linkCard = linkCard;
  }

  _addCartSubmit = event => {
    event.preventDefault();

    const newCard = { name: this._nameCard.value, link: this._linkCard.value };
    const cardItem = new Card(
      newCard,
      initialCard,
      handleCardClick(this._nameCard, this._linkCard)
    );

    cardsContainer.prepend(cardItem.createCard());
    this.closePopup();
  };

  openPopup() {
    super.openPopup();
    this._nameCard.value = '';
    this._linkCard.value = '';
    this._popup.addEventListener('submit', this._addCartSubmit);
  }
}

// export class BigImagePopup extends Popup {
//   constructor(popup, buttonOpen, buttonClose) {
//     super(popup, buttonOpen, buttonClose);
//     //     // this._bigImage = bigImage;
//     //     // this._bigName = bigName;
//   }

//   openPopup(event) {
//     this._popup.classList.add('popup_opened');
//     this._buttonClose.addEventListener('click', () => {
//       this.closePopup();
//     });
//     document.addEventListener('keydown', this._handleEscClose);
//     this._popup.addEventListener('mousedown', this._handleMouseClose);
//     this._hasInvalidButton();

//     const image = event.target;
//     const title = image.closest('.element').querySelector('.title').textContent;

//     bigImagePopupOpen.src = image.src;
//     bigImagePopupOpen.alt = image.alt;
//     bigNamePopupOpen.textContent = title;
//   }
// }
