//Попап Редактировать профиль
export const popupEdit = document.querySelector('.edit-popup');
export const buttonEditProfileOpen = document.querySelector('.profile__edit-button');
export const buttonEditProfileClose = document.querySelector('.edit-popup__close-button');
export const formEditPopup = document.querySelector('.form-edit');
export const buttonSubmitFormEdit = formEditPopup.querySelector('.form-edit__button');
export const inputNameEditPopup = formEditPopup.querySelector('.form-user-name');
export const inputAboutEditPopup = formEditPopup.querySelector('.form-user-about');
export const userNameElement = document.querySelector('.user-name');
export const userAboutElement = document.querySelector('.user-about');

//Попап Добавить Карт
export const popupAddCart = document.querySelector('.add-card-popup');
export const buttonAddCartOpen = document.querySelector('.profile__add-button');
export const buttonAddCartClose = document.querySelector('.add-card-popup__close-button');
export const formAddCart = document.querySelector('.add-card');
export const buttonFormAddCart = formAddCart.querySelector('.add-card__button');
export const newNameCard = formAddCart.querySelector('.form-add-card-name');
export const newLinkCard = formAddCart.querySelector('.form-add-card-link');

//Попап BigImage
export const popupBigImage = document.querySelector('.image-popup');
export const bigImagePopupOpen = popupBigImage.querySelector('.image-popup__image');
export const bigNamePopupOpen = popupBigImage.querySelector('.image-popup__title');
export const buttonCloseBigImage = document.querySelector('.image-popup__close-button');

// Card
export const cardsContainer = document.querySelector('.elements');
export const initialCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.elements__list');

//config
export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};
