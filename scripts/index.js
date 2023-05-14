//Импорты
import {
  popupEditElement,
  inputNameEditPopup,
  inputAboutEditPopup,
  popupAddCartElement,
  cardsContainer,
  initialCard,
  config
} from './constants.js';
import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage, PopupWithForm } from './Popup.js';
import { UserInfo } from './UserInfo.js';

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

//Функция создания карт из массива
function createCard(item) {
  const card = new Card(item, openPopupBigImage, initialCard);

  return card.createCard();
}

function openPopupBigImage(name, link) {
  popupBigImage.open(name, link);
}

//Валидация форм
const formEditValidation = new FormValidator(config, popupEditElement);
formEditValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCartElement);
formAddCartValidation.enableValidation();

// class UserInfo
const userInfo = new UserInfo('.user-name', '.user-about');

// Попапы
const popupBigImage = new PopupWithImage('.image-popup');
popupBigImage.setEventListeners();

const popupEdit = new PopupWithForm('.edit-popup', handleEditFormSubmit, handleEditFormOpen);
popupEdit.setEventListeners();

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
  formEditValidation.resetError();
}

function handleEditFormOpen() {
  const inputValueList = userInfo.getUserInfo();

  inputNameEditPopup.value = inputValueList.userName;
  inputAboutEditPopup.value = inputValueList.userAbout;

  formEditValidation.resetError();
}

const popupAddCart = new PopupWithForm(
  '.add-card-popup',
  handleAddCartFormSubmit,
  handleAddCartFormOpen
);
popupAddCart.setEventListeners();

function handleAddCartFormSubmit(data) {
  const newCard = createCard({ name: data.name, link: data.link });

  cardSection.addItem(newCard);
  formAddCartValidation.resetError();
}

function handleAddCartFormOpen() {
  formAddCartValidation.resetError();
}
