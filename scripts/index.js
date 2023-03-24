//Попап Редактировать профиль
//находим кнопку форму радактирования данных=попап
const editPopup = document.querySelector('.edit-popup');
if (!editPopup) {
  throw new Error('No editPopup');
}
//находим кнопку редактировать попап
const editProfileOpenButton = document.querySelector('.profile__edit-button');
if (!editProfileOpenButton) {
  throw new Error('No editProfileOpenButton');
}
//находим кнопку закрыть попап
const editProfileCloseButton = document.querySelector('.form-edit__close-button');
if (!editProfileCloseButton) {
  throw new Error('No editProfileCloseButton');
}
//события клика на открытие/закрытие попапа + функции
editProfileOpenButton.addEventListener('click', function () {
  openPopup(editPopup);
});
editProfileCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // const popupOpen = document.querySelector('.popup');
  popup.style.transition = 'visibility 0s, opacity 2s ease-in-out';
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // const popupClose = document.querySelector('.popup');
  popup.style.transition = 'visibility 0s 2s, opacity 2s ease-in-out';
}
//Изменение данных профиля через форму в попап
const formElement = document.querySelector('.form-edit');
const nameInput = formElement.querySelector('.form-user-name');
const aboutInput = formElement.querySelector('.form-user-about');
if (!nameInput) {
  throw new Error('No nameInput');
}
if (!aboutInput) {
  throw new Error('No aboutInput');
}
nameInput.getAttribute('value');
aboutInput.getAttribute('value');
const userNameElement = document.querySelector('.user-name');
const userAboutElement = document.querySelector('.user-about');
if (!userNameElement) {
  throw new Error('No userNameElement');
}
if (!userAboutElement) {
  throw new Error('No userAboutElement');
}
userNameElement.textContent = nameInput.value;
userAboutElement.textContent = aboutInput.value;
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  userName = nameInput.value;
  userAbout = aboutInput.value;
  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;
  closePopup(editPopup);
}
//Попап Добавить Карт
const addCartPopup = document.querySelector('.add-card-popup');
if (!addCartPopup) {
  throw new Error('No addCartPopupp');
}
//находим кнопку добавить карт попап
const addCartOpenButton = document.querySelector('.profile__add-button');
if (!addCartOpenButton) {
  throw new Error('No addCartOpenButton');
}
//находим кнопку закрыть попап
const addCartCloseButton = document.querySelector('.add-card__close-button');
if (!addCartCloseButton) {
  throw new Error('No addCartCloseButton');
}
//события клика на открытие/закрытие попапа + функции
addCartOpenButton.addEventListener('click', function () {
  openPopup(addCartPopup);
});
addCartCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  closePopup(addCartPopup);
});

//Создание карт из массива
const photoGaleryElements = document.querySelector('.elements');
const bigImage = document.querySelector('.image-popup');
if (!bigImage) {
  throw new Error('No bigImage');
}
const createCard = card => {
  const initialCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardName = initialCard.querySelector('.element__title');
  cardName.textContent = card.name;
  const cardImage = initialCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Фотография ${card.name}`);
  const elementDeleteButton = initialCard.querySelector('.button-card-delete');
  elementDeleteButton.addEventListener('click', elementDeleteClick);
  const likeButton = initialCard.querySelector('.button-like');
  likeButton.addEventListener('click', likeButtonClick);
  photoGaleryElements.prepend(initialCard);

  cardImage.addEventListener('click', function () {
    openPopup(bigImage);
    const bigImagePopupOpen = bigImage.querySelector('.image-popup__image');
    const bigNamePopupOpen = bigImage.querySelector('.image-popup__title');
    bigImagePopupOpen.setAttribute('src', card.link);
    bigImagePopupOpen.setAttribute('alt', `Фотография ${card.name}`);
    bigNamePopupOpen.textContent = card.name;
  });
};
initialCards.forEach(createCard);
//удаление карточки
function elementDeleteClick(event) {
  const button = event.target;
  const card = button.closest('.elements__list');
  card.remove();
}
//кнопка поставить лайк
function likeButtonClick(event) {
  const button = event.target;
  button.classList.toggle('button-like_active');
}
//Добавление Карт через форму в попап
const formAddCart = document.querySelector('.add-card');
const buttonFormAddCart = formAddCart.querySelector('.add-card__button');
buttonFormAddCart.addEventListener('click', addCartSubmit);
function addCartSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const newName = formAddCart.querySelector('.form-add-card-name').value;
  // if (!newName) {
  //   throw new Error('No newNameAddCartInput');
  // }
  const newLink = formAddCart.querySelector('.form-add-card-link').value;
  // if (!newLink) {
  //   throw new Error('No newLinkAddCartInput');
  // }
  const newCard = { name: newName, link: newLink };
  createCard(newCard);
  closePopup(addCartPopup);
  formAddCart.reset();
}
//Закрыть карточку изображения
const bigImageCloseBotton = document.querySelector('.image-popup__close-button');
if (!bigImageCloseBotton) {
  throw new Error('No bigImageCloseBotton');
}
bigImageCloseBotton.addEventListener('click', function () {
  closePopup(bigImage);
});
