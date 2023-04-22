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
