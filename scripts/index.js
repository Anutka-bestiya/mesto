//Импорты
import {
  popupEdit,
  buttonEditProfileOpen,
  buttonEditProfileClose,
  formEditPopup,
  buttonSubmitFormEdit,
  inputNameEditPopup,
  inputAboutEditPopup,
  userNameElement,
  userAboutElement,
  popupAddCart,
  buttonAddCartOpen,
  buttonAddCartClose,
  formAddCart,
  buttonFormAddCart,
  newNameCard,
  newLinkCard,
  popupBigImage,
  bigImagePopupOpen,
  bigNamePopupOpen,
  buttonCloseBigImage,
  cardsContainer,
  initialCard,
  config
} from './constants.js';
import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage, PopupWithForm } from './Popup.js';

// Отрисовка карт в разметке

const cardSection = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = createCard(item);

      cardSection.addItem(card);
    }
  },
  cardsContainer
);
cardSection.renderItems();

const popupBigImage1 = new PopupWithImage('.image-popup');
popupBigImage1.setEventListeners();

//Функция создания карт из массива

function createCard(item) {
  const card = new Card(item, openPopupBigImage1, initialCard);

  return card.createCard();
}

function openPopupBigImage1(name, link) {
  popupBigImage1.open(name, link);
}

//Валидация форм
const formEditValidation = new FormValidator(config, popupEdit);
formEditValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCart);
formAddCartValidation.enableValidation();

//Попапы
const popupEdit1 = new PopupWithForm('.edit-popup', buttonSubmitFormEdit);
popupEdit1.setEventListeners();

// popupEdit.addEventListener('mousedown', handleMouseClose);
// buttonEditProfileOpen.addEventListener('click', openPopupEditProfile);
// buttonEditProfileClose.addEventListener('click', function (evt) {
//   closePopup(popupEdit);
// });
// formEditPopup.addEventListener('submit', handleFormSubmit);

popupAddCart.addEventListener('mousedown', handleMouseClose);
buttonAddCartOpen.addEventListener('click', openPopupAddCart);
buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(popupAddCart);
});
formAddCart.addEventListener('submit', addCartSubmit);

// popupBigImage.addEventListener('mousedown', handleMouseClose);
// buttonCloseBigImage.addEventListener('click', function () {
//   closePopup(popupBigImage);
// });

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
function openPopupBigImage(name, link) {
  openPopup(popupBigImage);

  bigImagePopupOpen.src = link;
  bigImagePopupOpen.alt = name;
  bigNamePopupOpen.textContent = name;
}
