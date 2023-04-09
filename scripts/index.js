//Функции Попапов
//Открытие Попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

//Закрытие Попапов
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const popupTarget = document.querySelector('.popup_opened');

    closePopup(popupTarget);
  }
}

function handleMouseClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

//Дизактивация кнопки submit в формах
function hasInvalidButton(buttonSelector) {
  buttonSelector.disabled = true;
  buttonSelector.classList.add('popup__button_disabled');
}

//Попап Редактировать профиль
const popupEdit = document.querySelector('.edit-popup');
const buttonEditProfileOpen = document.querySelector('.profile__edit-button');
const buttonEditProfileClose = document.querySelector('.edit-popup__close-button');
const formEditPopup = document.querySelector('.form-edit');
const buttonSubmitFormEdit = formEditPopup.querySelector('.form-edit__button');
const inputNameEditPopup = formEditPopup.querySelector('.form-user-name');
const inputAboutEditPopup = formEditPopup.querySelector('.form-user-about');
const userNameElement = document.querySelector('.user-name');
const userAboutElement = document.querySelector('.user-about');
popupEdit.addEventListener('mousedown', handleMouseClose);

//события клика на открытие/закрытие попапа edit-popup
buttonEditProfileOpen.addEventListener('click', function () {
  openPopup(popupEdit);
  hasInvalidButton(buttonSubmitFormEdit);
  // formEditPopup.reset();

  inputNameEditPopup.value = userNameElement.textContent;
  inputAboutEditPopup.value = userAboutElement.textContent;
  // clearInputError(popupEdit);
});

buttonEditProfileClose.addEventListener('click', function (evt) {
  closePopup(popupEdit);
});

//Изменение данных профиля через форму в попап
formEditPopup.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();

  userName = inputNameEditPopup.value;
  userAbout = inputAboutEditPopup.value;

  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;

  closePopup(popupEdit);
}

//Попап Добавить Карт
const popupAddCart = document.querySelector('.add-card-popup');
const buttonAddCartOpen = document.querySelector('.profile__add-button');
const buttonAddCartClose = document.querySelector('.add-card-popup__close-button');
const formAddCart = document.querySelector('.add-card');
const buttonFormAddCart = formAddCart.querySelector('.add-card__button');
const newNameCard = formAddCart.querySelector('.form-add-card-name');
const newLinkCard = formAddCart.querySelector('.form-add-card-link');
popupAddCart.addEventListener('mousedown', handleMouseClose);

//события клика на открытие/закрытие попапа add-card + функции
buttonAddCartOpen.addEventListener('click', function () {
  openPopup(popupAddCart);
  hasInvalidButton(buttonFormAddCart);

  newNameCard.value = '';
  newLinkCard.value = '';
});

buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(popupAddCart);
});

//Добавление Карт через форму в попап
formAddCart.addEventListener('submit', addCartSubmit);
function addCartSubmit(event) {
  event.preventDefault();

  const newCard = { name: newNameCard.value, link: newLinkCard.value };
  const newCardCreate = createCard(newCard);

  renderCard(newCardCreate);
  closePopup(popupAddCart);
}

//Попап BigImage
const popupBigImage = document.querySelector('.image-popup');
const bigImagePopupOpen = popupBigImage.querySelector('.image-popup__image');
const bigNamePopupOpen = popupBigImage.querySelector('.image-popup__title');
const buttonCloseBigImage = document.querySelector('.image-popup__close-button');
popupBigImage.addEventListener('mousedown', handleMouseClose);

//Открыть Попап BigImage
function openPopupBigImage(event) {
  openPopup(popupBigImage);

  const image = event.target;
  const title = image.closest('.element').querySelector('.title').textContent;

  bigImagePopupOpen.src = image.src;
  bigImagePopupOpen.alt = image.alt;
  bigNamePopupOpen.textContent = title;
}

//Закрыть Попап BigImage
buttonCloseBigImage.addEventListener('click', function () {
  closePopup(popupBigImage);
});

//Класс кард
class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._card = undefined;
  }

  _getTemplate = () => {
    const cardElement = this._cardTemplateSelector.cloneNode(true);

    return cardElement;
  };

  _handleCardClick = () => {};

  _handleDeleteElementClick = () => {
    this._card.remove();
  };
  _likeButtonClick = () => {
    this._likeButton.classList.toggle('button-like_active');
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
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
    this._deleteCardButton = this._card.querySelector('.button-card-delete');
    this._likeButton = this._card.querySelector('.button-like');

    this._setEventListeners();

    return this._card;
  };
  console = () => {
    console.log(this._handleCardClick);
    console.log(this._likeButton);
  };
}
const cardsContainer = document.querySelector('.elements');
const initialCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.elements__list');

//Функция создания карт из массива

initialCards.forEach(item => {
  const card = new Card(item, initialCard, openPopupBigImage);
  card.console();
  const card1 = card.createCard();
  cardsContainer.prepend(card.createCard());
});

// const cardItem = new Card(data, initialCard, openPopupBigImage);

//очистка span с ошибками при закрытии форм
// function clearInputError(popup) {
//   const formSpanList = Array.from(popup.querySelectorAll('.popup__input'));
//   formSpanList.forEach(span => {
//     hideInputError(formSpanList, span);
//   });
// }
