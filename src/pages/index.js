//Импорты
import './index.css';
import {
  profileImage,
  profileName,
  profileAbout,
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
import { data } from 'jquery';

//Валидация форм
const formEditValidation = new FormValidator(config, popupEditElement);
formEditValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCartElement);
formAddCartValidation.enableValidation();

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

//запрос данных о пользователе
fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
  headers: {
    authorization: '8629910e-8349-4959-825d-5e9f5cf99f3f'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then(data => {
    // console.log(data);
    profileImage.src = data.avatar;
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
  })
  .catch(err => {
    console.log(err); // "Что-то пошло не так: ..."
  });

// class UserInfo
const userInfo = new UserInfo('.user-name', '.user-about');

//запрос карточек
const initialCardsData = fetch('https://nomoreparties.co/v1/cohort-66/cards', {
  headers: {
    authorization: '8629910e-8349-4959-825d-5e9f5cf99f3f'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then(data => {
    // console.log(data);
    //   initialCardsData = data;
    //   console.log(initialCardsData);
    return data;
  })
  .catch(err => {
    console.log(`Ошибка ${err}`); // "Что-то пошло не так: ..."
  });

console.log(initialCardsData);
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
