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

//Попап Добавить Карт
const popupAddCart = document.querySelector('.add-card-popup');
const buttonAddCartOpen = document.querySelector('.profile__add-button');
const buttonAddCartClose = document.querySelector('.add-card-popup__close-button');
const formAddCart = document.querySelector('.add-card');
const buttonFormAddCart = formAddCart.querySelector('.add-card__button');
const newNameCard = formAddCart.querySelector('.form-add-card-name');
const newLinkCard = formAddCart.querySelector('.form-add-card-link');

//Попап BigImage
const popupBigImage = document.querySelector('.image-popup');
const bigImagePopupOpen = popupBigImage.querySelector('.image-popup__image');
const bigNamePopupOpen = popupBigImage.querySelector('.image-popup__title');
const buttonCloseBigImage = document.querySelector('.image-popup__close-button');

// Card
const cardsContainer = document.querySelector('.elements');
const initialCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.elements__list');

//config
const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

//Импорты
// import * as data from './constants.js';
import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

//Функция создания карт из массива
// initialCards.forEach(item => {
//   const card = new Card(item, initialCard, openPopupBigImage);
//   cardsContainer.prepend(card.createCard());
// });

initialCards.forEach(renderCard);
function renderCard(item) {
  const card = new Card(item, initialCard, openPopupBigImage);
  cardsContainer.prepend(card.createCard());
}
//Валидация форм
const formEditValidation = new FormValidator(config, popupEdit);
formEditValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCart);
formAddCartValidation.enableValidation();

//Попапы
popupEdit.addEventListener('mousedown', handleMouseClose);
buttonEditProfileOpen.addEventListener('click', openPopupEditProfile);
buttonEditProfileClose.addEventListener('click', function (evt) {
  closePopup(popupEdit);
});
formEditPopup.addEventListener('submit', handleFormSubmit);

popupAddCart.addEventListener('mousedown', handleMouseClose);
buttonAddCartOpen.addEventListener('click', openPopupAddCart);
buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(popupAddCart);
});
formAddCart.addEventListener('submit', addCartSubmit);

popupBigImage.addEventListener('mousedown', handleMouseClose);
buttonCloseBigImage.addEventListener('click', function () {
  closePopup(popupBigImage);
});

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

//Попап Редактировать профиль
//события клика на открытие/закрытие попапа edit-popup
function openPopupEditProfile() {
  openPopup(popupEdit);

  inputNameEditPopup.value = userNameElement.textContent;
  inputAboutEditPopup.value = userAboutElement.textContent;

  formEditValidation.resetError();
}

//Изменение данных профиля через форму в попап
function handleFormSubmit(event) {
  event.preventDefault();

  const userName = inputNameEditPopup.value;
  const userAbout = inputAboutEditPopup.value;

  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;

  closePopup(popupEdit);
}

//Попап Добавить Карт
//события клика на открытие/закрытие попапа add-card
function openPopupAddCart() {
  openPopup(popupAddCart);

  newNameCard.value = '';
  newLinkCard.value = '';

  formAddCartValidation.resetError();
}

//Добавление Карт через форму в попап
function addCartSubmit(event) {
  event.preventDefault();

  const newCard = { name: newNameCard.value, link: newLinkCard.value };

  renderCard(newCard);
  closePopup(popupAddCart);
}

//Попап BigImage
//Открыть Попап BigImage
function openPopupBigImage(event) {
  openPopup(popupBigImage);

  const image = event.target;
  const title = image.closest('.element').querySelector('.title').textContent;

  bigImagePopupOpen.src = image.src;
  bigImagePopupOpen.alt = image.alt;
  bigNamePopupOpen.textContent = title;
}
