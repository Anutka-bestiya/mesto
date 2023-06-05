//Импорты
import './index.css';
import {
  popupEditElement,
  buttonEditProfileOpen,
  inputNameEditPopup,
  inputAboutEditPopup,
  popupEditAvatarElement,
  buttonEditAvatarOpen,
  inputAvatarEditPopup,
  popupAddCartElement,
  buttonAddCartOpen,
  cardsContainer,
  initialCard,
  config
} from '../components/constants.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { data } from 'jquery';
// import { construct } from 'core-js/fn/reflect';

//API
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '8629910e-8349-4959-825d-5e9f5cf99f3f',
    'Content-Type': 'application/json'
  }
});

let authorId = {};

api
  .getUserInfoServe()
  .then(res => {
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
    authorId = res._id;
  })
  .then(res => {
    api.getInitialCards().then(res => {
      const initialCardsData = res;
      initialCardsData.forEach(card => {
        const newCard = createCard({
          name: card.name,
          link: card.link,
          likes: card.likes,
          _id: card._id,
          owner: card.owner,
          authorId: authorId
        });

        cardSection.addItem(newCard);
      });
    });
  });

// Отрисовка карт в разметке
const cardSection = new Section(
  {
    items: [],
    renderer: item => {
      const card = createCard(item);

      cardSection.addItem(card);
    }
  },
  cardsContainer
);

//Функция создания карт из массива
function createCard(item) {
  const card = new Card(
    item,
    openPopupBigImage,
    data => {
      if (card.isLikeAuthor()) {
        api.deleteLike(data._id).then(res => {
          card.setLiked(res);
        });
      } else {
        api.addLike(data._id).then(res => {
          card.setLiked(res);
        });
      }
    },
    openPopupConfirm,
    initialCard
  );

  return card.createCard();
}

function openPopupBigImage(name, link) {
  popupBigImage.open(name, link);
}

function openPopupConfirm(id) {
  popupConfirm.open(id);
}

// class UserInfo
const userInfo = new UserInfo('.user-name', '.user-about', '.user-avatar');

//Валидация форм
const formEditValidation = new FormValidator(config, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(config, popupEditAvatarElement);
formEditAvatarValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCartElement);
formAddCartValidation.enableValidation();

// Попапы
const popupBigImage = new PopupWithImage('.image-popup');
popupBigImage.setEventListeners();

const popupEdit = new PopupWithForm('.edit-popup', handleEditFormSubmit, handleEditFormOpen);
popupEdit.setEventListeners();
buttonEditProfileOpen.addEventListener('click', () => popupEdit.open());

async function handleEditFormSubmit(data) {
  await api.setUserInfoServe(data);
  userInfo.setUserInfo(data);
}

async function handleEditFormOpen() {
  const inputValueList = await api.getUserInfoServe();

  inputNameEditPopup.value = inputValueList.name;
  inputAboutEditPopup.value = inputValueList.about;

  formEditValidation.resetError();
}

const popupEditAvatar = new PopupWithForm(
  '.avatar-edit-popup',
  handleEditAvatarFormSubmit,
  handleEditAvatarFormOpen
);
popupEditAvatar.setEventListeners();
buttonEditAvatarOpen.addEventListener('click', () => popupEditAvatar.open());

async function handleEditAvatarFormSubmit(data) {
  console.log(data);
  await api.setUserAvatarServe(data);
  userInfo.setUserAvatar(data);
}

async function handleEditAvatarFormOpen() {
  const inputValueList = await api.getUserInfoServe();

  inputAvatarEditPopup.value = inputValueList.avatar;

  formEditAvatarValidation.resetError();
}

const popupAddCart = new PopupWithForm(
  '.add-card-popup',
  handleAddCartFormSubmit,
  handleAddCartFormOpen
);
popupAddCart.setEventListeners();
buttonAddCartOpen.addEventListener('click', () => popupAddCart.open());

function handleAddCartFormSubmit(data) {
  api.saveNewCard(data).then(res => {
    const newCard = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      _id: res._id,
      owner: res.owner,
      authorId: authorId
    });

    cardSection.addItem(newCard);
  });
}

function handleAddCartFormOpen() {
  formAddCartValidation.resetError();
}

const popupConfirm = new PopupWithConfirm('.confirm-popup', handleConfirmSubmit);
popupConfirm.setEventListeners();

function handleConfirmSubmit(id) {
  console.log(id);
  api.deleteCard(id);
}
