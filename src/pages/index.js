//Импорты
import './index.css';
import {
  popupEditElement,
  buttonEditProfileOpen,
  inputNameEditPopup,
  inputAboutEditPopup,
  popupAddCartElement,
  buttonAddCartOpen,
  cardsContainer,
  initialCard,
  config
} from '../components/constants.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../components/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

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
buttonEditProfileOpen.addEventListener('click', () => popupEdit.open());

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
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
buttonAddCartOpen.addEventListener('click', () => popupAddCart.open());

function handleAddCartFormSubmit(data) {
  const newCard = createCard({ name: data.name, link: data.link });

  cardSection.addItem(newCard);
}

function handleAddCartFormOpen() {
  formAddCartValidation.resetError();
}
