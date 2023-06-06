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
  .then(([res, data]) => {
    // class UserInfo
    const userInfo = new UserInfo('.user-name', '.user-about', '.user-avatar');

    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
    authorId = res._id;

    // Отрисовка карт в разметке
    const cardSection = new Section(
      { items: [], renderer: item => cardSection.addItem(createCard(item)) },
      cardsContainer
    );

    const initialCardsData = data;

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

    //попадаем сюда когда оба промиса будут выполнены
    //у нас есть все нужные данные, отрисовываем страницу

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
          popupEdit.close();
        })
        .catch(err => console.log(`Ошибка сохранения UserInfo: ${err}`))
        .finally(() => {
          popupEdit.changeSaveBatton('Сохранить'); // Здесь изменяем текст кнопки
        });
      userInfo.setUserInfo(data);
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
          popupEditAvatar.close();
        })
        .catch(err => console.log(`Ошибка сохранения аватара: ${err}`))
        .finally(() => {
          popupEditAvatar.changeSaveBatton('Сохранить'); // Здесь изменяем текст кнопки
        });
      userInfo.setUserAvatar(data);
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
          const newCard = createCard({
            name: res.name,
            link: res.link,
            likes: res.likes,
            _id: res._id,
            owner: res.owner,
            authorId: authorId
          });

          cardSection.addItem(newCard);
        })
        .then(() => {
          popupAddCart.close();
        })
        .catch(err => console.log(`Ошибка создания NewCard: ${err}`))
        .finally(() => {
          popupAddCart.changeSaveBatton('Создать'); // Здесь изменяем текст кнопки
        });
    }
  })
  .catch(([err, errCard]) => {
    //попадаем сюда если один из промисов завершаться ошибкой
    console.log(`Ошибка получения UserInfo: ${err}`);
    console.log(`Ошибка получения массива Cards: ${errCard}`);
  })
  .finally(() => {});

//Валидация форм
const formEditValidation = new FormValidator(config, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(config, popupEditAvatarElement);
formEditAvatarValidation.enableValidation();

const formAddCartValidation = new FormValidator(config, popupAddCartElement);
formAddCartValidation.enableValidation();

//Функция создания карт из массива
function createCard(item) {
  const card = new Card(
    item,
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

  return card.createCard();
}

function openPopupBigImage(name, link) {
  popupBigImage.open(name, link);
}

function openPopupConfirm(id, card) {
  popupConfirm.open(id, card);
}

function handleAddCartFormOpen() {
  formAddCartValidation.resetError();
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
