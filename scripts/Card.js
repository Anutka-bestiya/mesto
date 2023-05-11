//Класс кард
export class Card {
  constructor(data, handleCardClick, cardTemplateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._card = undefined;
  }

  _getTemplate = () => {
    return this._cardTemplateSelector.cloneNode(true);
  };

  _handleDeleteElementClick = () => {
    this._card.remove();
  };

  _likeButtonClick = () => {
    this._likeButton.classList.toggle('button-like_active');
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._deleteCardButton.addEventListener('click', this._handleDeleteElementClick);
    this._likeButton.addEventListener('click', this._likeButtonClick);
  }

  createCard = () => {
    this._card = this._getTemplate();
    this._cardName = this._card.querySelector('.element__title');
    this._cardImage = this._card.querySelector('.element__image');

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;
    this._cardImage.classList.add('button__open');

    this._deleteCardButton = this._card.querySelector('.button-card-delete');
    this._likeButton = this._card.querySelector('.button-like');

    this._setEventListeners();

    return this._card;
  };
}
