//Класс кард
export class Card {
  constructor(data, handleCardClick, handleLikeClick, handleDeleteElementClick, cardTemplate) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner;
    this._authorId = data.authorId;
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteElementClick = handleDeleteElementClick;
    this._card = undefined;
  }

  _getTemplate = () => {
    return this._cardTemplate.cloneNode(true);
  };

  handleDeleteCard = () => {
    this._card.remove();
    this._card = null;
  };

  _likeAddButtonClick = () => {
    this._likeButton.classList.add('button-like_active');
  };

  _likeDelButtonClick = () => {
    this._likeButton.classList.remove('button-like_active');
  };

  isLikeAuthor() {
    return this._likes.some(likes => {
      return likes._id === this._authorId;
    });
  }

  setLiked(data) {
    this._likes = data.likes;
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLikeAuthor()) {
      this._likeAddButtonClick();
    } else {
      this._likeDelButtonClick();
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    if (this._ownerId._id === this._authorId) {
      this._deleteCardButton.addEventListener('click', () => {
        this._handleDeleteElementClick(this._id);
        // this._handleDeleteCard();
      });
    } else {
      this._deleteCardButton.style.display = 'none';
    }

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._data);
    });
  }

  createCard = () => {
    this._card = this._getTemplate();
    this._cardName = this._card.querySelector('.element__title');
    this._cardImage = this._card.querySelector('.element__image');
    this._likeCountElement = this._card.querySelector('.element__like-count');

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;
    this._cardImage.classList.add('button__open');

    this._deleteCardButton = this._card.querySelector('.button-card-delete');
    this._likeButton = this._card.querySelector('.button-like');

    this.setLiked(this._data);
    this._setEventListeners();

    return this._card;
  };
}
