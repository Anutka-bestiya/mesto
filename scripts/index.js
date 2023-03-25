//Функции Попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('mousedown', handleMouseClose);
}
function handleEscClose(evt) {
  const popupTarget = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupTarget);
    document.removeEventListener('keydown', handleEscClose);
  }
}
function handleMouseClose(evt) {
  const popupTarget = document.querySelector('.popup_opened');
  if (evt.target === popupTarget) {
    closePopup(popupTarget);
    document.removeEventListener('mousedown', handleMouseClose);
  }
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
  formEditPopup.reset();
  inputNameEditPopup.value = userNameElement.textContent;
  inputAboutEditPopup.value = userAboutElement.textContent;
  // clearInputError(popupEdit);
});
buttonEditProfileClose.addEventListener('click', function (evt) {
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
//события клика на открытие/закрытие попапа + функции
buttonAddCartOpen.addEventListener('click', function () {
  openPopup(popupAddCart);
  formAddCart.reset();
  // clearInputError(popupAddCart);
});
buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(popupAddCart);
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
//Закрыть Попап BigImage
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
  const newCard = { name: newNameCard.value, link: newLinkCard.value };
  const newCardCreate = createCard(newCard);
  renderCard(newCardCreate);
  closePopup(popupAddCart);
}

//очистка span с ошибками при закрытии форм
// function clearInputError(popup) {
//   const formSpanList = Array.from(popup.querySelectorAll('.popup__input'));
//   formSpanList.forEach(span => {
//     hideInputError(formSpanList, span);
//   });
// }
