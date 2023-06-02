//Профиль
export const profileImage = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

//Попап Редактировать профиль
export const popupEditElement = document.querySelector('.edit-popup');
export const buttonEditProfileOpen = document.querySelector('.profile__edit-button');
export const inputNameEditPopup = popupEditElement.querySelector('.form-user-name');
export const inputAboutEditPopup = popupEditElement.querySelector('.form-user-about');

//Попап Добавить Карт
export const popupAddCartElement = document.querySelector('.add-card-popup');
export const buttonAddCartOpen = document.querySelector('.profile__add-button');

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
