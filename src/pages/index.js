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

Promise.all([
  //в Promise.all передаем массив промисов которые нужно выполнить
  api.getUserInfoServe(),
  api.getInitialCards()
])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    authorId = user._id;

    const initialCardsData = cards;

    cardSection.renderItems(initialCardsData);

    //попадаем сюда когда оба промиса будут выполнены
    //у нас есть все нужные данные, отрисовываем страницу
  })
  .catch(err => {
    //попадаем сюда если один из промисов завершаться ошибкой
    console.log(`Ошибка получения UserInfo, массива Cards: ${err}`);
  });

// class UserInfo
const userInfo = new UserInfo('.user-name', '.user-about', '.user-avatar');

// Отрисовка карт в разметке
const cardSection = new Section(item => renderCard(item), cardsContainer);

//Функция создания карт из массива
function renderCard(item) {
  const card = new Card(
    {
      name: item.name,
      link: item.link,
      likes: item.likes,
      _id: item._id,
      owner: item.owner,
      authorId: authorId
    },
    openPopupBigImage,
    data => {
      if (card.isLikeAuthor()) {
        api
          .deleteLike(data._id)
          .then(res => card.setLiked(res))
          .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
      } else {
        api
          .addLike(data._id)
          .then(res => card.setLiked(res))
          .catch(err => console.log(`Ошибка постановки лайка: ${err}`));
      }
    },
    id => {
      popupConfirm.open(id, () => card.handleDeleteCard());
    },
    initialCard
  );

  cardSection.addItem(card.createCard());
}

//Валидация форм
const formEditValidation = new FormValidator(config, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(config, popupEditAvatarElement);
formEditAvatarValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCartElement);
formAddCartValidation.enableValidation();

// Попапы
// Попап редактировать профиль
const popupEdit = new PopupWithForm('.edit-popup', handleEditFormSubmit, handleEditFormOpen);
popupEdit.setEventListeners();
buttonEditProfileOpen.addEventListener('click', () => popupEdit.open());

function handleEditFormSubmit(data) {
  popupEdit.changeSaveBatton('Сохранение...');
  api
    .setUserInfoServe(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch(err => console.log(`Ошибка сохранения UserInfo: ${err}`))
    .finally(() => {
      popupEdit.changeSaveBatton('Сохранить'); // Здесь изменяем текст кнопки
    });
}

function handleEditFormOpen() {
  const inputValueList = userInfo.getUserInfo();

  inputNameEditPopup.value = inputValueList.userName;
  inputAboutEditPopup.value = inputValueList.userAbout;

  formEditValidation.resetError();
}

// Попап редактировать Аватар
const popupEditAvatar = new PopupWithForm(
  '.avatar-edit-popup',
  handleEditAvatarFormSubmit,
  handleEditAvatarFormOpen
);
popupEditAvatar.setEventListeners();
buttonEditAvatarOpen.addEventListener('click', () => popupEditAvatar.open());

function handleEditAvatarFormSubmit(data) {
  popupEditAvatar.changeSaveBatton('Сохранение...');
  api
    .setUserAvatarServe(data)
    .then(() => {
      userInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch(err => console.log(`Ошибка сохранения аватара: ${err}`))
    .finally(() => {
      popupEditAvatar.changeSaveBatton('Сохранить'); // Здесь изменяем текст кнопки
    });
}

function handleEditAvatarFormOpen() {
  inputAvatarEditPopup.value = '';

  formEditAvatarValidation.resetError();
}

// Попап добавтить карт
const popupAddCart = new PopupWithForm(
  '.add-card-popup',
  handleAddCartFormSubmit,
  handleAddCartFormOpen
);
popupAddCart.setEventListeners();
buttonAddCartOpen.addEventListener('click', () => popupAddCart.open());

function handleAddCartFormSubmit(data) {
  popupAddCart.changeSaveBatton('Создание...');
  api
    .saveNewCard(data)
    .then(res => {
      renderCard(res);
    })
    .then(() => {
      popupAddCart.close();
    })
    .catch(err => console.log(`Ошибка создания NewCard: ${err}`))
    .finally(() => {
      popupAddCart.changeSaveBatton('Создать'); // Здесь изменяем текст кнопки
    });
}

// Попап открыть изображение
const popupBigImage = new PopupWithImage('.image-popup');
popupBigImage.setEventListeners();

// Попап подтверждение удаления карточки
const popupConfirm = new PopupWithConfirm('.confirm-popup', handleConfirmSubmit);
popupConfirm.setEventListeners();

function handleConfirmSubmit(id, newFunc) {
  popupConfirm.changeConfirmBatton('Удаление...');
  api
    .deleteCard(id)
    .then(() => {
      newFunc();
      popupConfirm.close();
    })
    .catch(err => console.log(`Ошибка удаления Card: ${err}`))
    .finally(() => {
      popupConfirm.changeConfirmBatton('Да'); // Здесь изменяем текст кнопки
    });
}

function openPopupBigImage(name, link) {
  popupBigImage.open(name, link);
}

function handleAddCartFormOpen() {
  formAddCartValidation.resetError();
}
