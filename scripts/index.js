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
  popup.style.transition = 'visibility 0s, opacity 2s ease-in-out';
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Попап Редактировать профиль
const popupEdit = document.querySelector('.edit-popup');
const buttonEditProfileOpen = document.querySelector('.profile__edit-button');
const buttonEditProfileClose = document.querySelector('.edit-popup__close-button');
const formEditPopup = document.querySelector('.form-edit');
const inputNameEditPopup = formEditPopup.querySelector('.form-user-name');
const inputAboutEditPopup = formEditPopup.querySelector('.form-user-about');
const userNameElement = document.querySelector('.user-name');
const userAboutElement = document.querySelector('.user-about');

//события клика на открытие/закрытие попапа edit-popup
buttonEditProfileOpen.addEventListener('click', function () {
  openPopup(popupEdit);
  inputNameEditPopup.value = userNameElement.textContent;
  inputAboutEditPopup.value = userAboutElement.textContent;
});
buttonEditProfileClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
//Изменение данных профиля через форму в попап
formEditPopup.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  userName = inputNameEditPopup.value;
  userAbout = inputAboutEditPopup.value;
  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;
  closePopup(popupEdit);
}
//Попап Добавить Карт
const popupAddCart = document.querySelector('.add-card-popup');
const buttonAddCartOpen = document.querySelector('.profile__add-button');
const buttonAddCartClose = document.querySelector('.add-card-popup__close-button');
//события клика на открытие/закрытие попапа
buttonAddCartOpen.addEventListener('click', function () {
  openPopup(popupAddCart);
  formAddCart.reset();
});
buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(popupAddCart);
  // formAddCart.reset();
});
//Создание карт из массива, elements card
const cardsContainer = document.querySelector('.elements');
const bigImage = document.querySelector('.image-popup');
const initialCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.elements__list');

//Функция создания карт из массива
initialCards.forEach(card => {
  const finalCard = createCard(card);
  renderCard(finalCard);
});
function createCard(card) {
  const element = initialCard.cloneNode(true);
  const cardName = element.querySelector('.element__title');
  const cardImage = element.querySelector('.element__image');
  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;
  const elementDeleteButton = element.querySelector('.button-card-delete');
  const likeButton = element.querySelector('.button-like');
  const cardImageLink = element.querySelector('.element__image');
  elementDeleteButton.addEventListener('click', handleDeleteElementClick);
  likeButton.addEventListener('click', likeButtonClick);
  cardImageLink.addEventListener('click', openPopupBigImage);
  return element;
}
function renderCard(card) {
  cardsContainer.prepend(card);
}
//удаление карточки
function handleDeleteElementClick(event) {
  const button = event.target;
  const card = button.closest('.elements__list');
  card.remove();
}
//кнопка поставить лайк
function likeButtonClick(event) {
  const button = event.target;
  button.classList.toggle('button-like_active');
}
//Открыть Попап BigImage
const bigImagePopupOpen = bigImage.querySelector('.image-popup__image');
const bigNamePopupOpen = bigImage.querySelector('.image-popup__title');
function openPopupBigImage(event) {
  openPopup(bigImage);
  const image = event.target;
  const title = image.closest('.element').querySelector('.title').textContent;
  bigImagePopupOpen.src = image.src;
  bigImagePopupOpen.alt = image.alt;
  bigNamePopupOpen.textContent = title;
}
//Закрыть попап BigImage
const buttonCloseBigImage = document.querySelector('.image-popup__close-button');
buttonCloseBigImage.addEventListener('click', function () {
  closePopup(bigImage);
});
//Добавление Карт через форму в попап
const formAddCart = document.querySelector('.add-card');
const buttonFormAddCart = formAddCart.querySelector('.add-card__button');
buttonFormAddCart.addEventListener('click', addCartSubmit);
const newNameCard = formAddCart.querySelector('.form-add-card-name');
const newLinkCard = formAddCart.querySelector('.form-add-card-link');
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
