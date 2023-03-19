//массив карт
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//Функции Попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Попап Редактировать профиль
const editPopup = document.querySelector('.edit-popup');
const buttonEditProfileOpen = document.querySelector('.profile__edit-button');
const buttonEditProfileClose = document.querySelector('.edit-popup__close-button');
const formEditPopup = document.querySelector('.form-edit');
const inputNameEditPopup = formEditPopup.querySelector('.form-user-name');
const inputAboutEditPopup = formEditPopup.querySelector('.form-user-about');
const userNameElement = document.querySelector('.user-name');
const userAboutElement = document.querySelector('.user-about');
inputNameEditPopup.value = userNameElement.textContent;
inputAboutEditPopup.value = userAboutElement.textContent;
userNameElement.textContent = inputNameEditPopup.value;
userAboutElement.textContent = inputAboutEditPopup.value;

//события клика на открытие/закрытие попапа edit-popup
buttonEditProfileOpen.addEventListener('click', function () {
  openPopup(editPopup);
});
buttonEditProfileClose.addEventListener('click', function () {
  closePopup(editPopup);
  inputNameEditPopup.value = userNameElement.textContent;
  inputAboutEditPopup.value = userAboutElement.textContent;
});
//Изменение данных профиля через форму в попап
formEditPopup.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  userName = inputNameEditPopup.value;
  userAbout = inputAboutEditPopup.value;
  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;
  closePopup(editPopup);
}
//Попап Добавить Карт
const addCartPopup = document.querySelector('.add-card-popup');
const buttonAddCartOpen = document.querySelector('.profile__add-button');
const buttonAddCartClose = document.querySelector('.add-card-popup__close-button');
//события клика на открытие/закрытие попапа
buttonAddCartOpen.addEventListener('click', function () {
  openPopup(addCartPopup);
});
buttonAddCartClose.addEventListener('click', function (event) {
  closePopup(addCartPopup);
  formAddCart.reset();
});
//Создание карт из массива, elements card
const cardsContainer = document.querySelector('.elements');
const bigImage = document.querySelector('.image-popup');
const initialCard = document
  .querySelector('#cardTemplate')
  .content.querySelector('.elements__list');
const cardName = initialCard.querySelector('.element__title');
const cardImage = initialCard.querySelector('.element__image');

//Функция создания карт из массива
initialCards.forEach(createCard);
function createCard(card) {
  cardName.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Фотография ${card.name}`);
  renderCard(card);
  const elementDeleteButton = cardsContainer.querySelector('.button-card-delete');
  const likeButton = cardsContainer.querySelector('.button-like');
  const cardImageLink = cardsContainer.querySelector('.element__image');
  elementDeleteButton.addEventListener('click', handleDeleteElementClick);
  likeButton.addEventListener('click', likeButtonClick);
  cardImageLink.addEventListener('click', openPopupBigImage);
}
function renderCard(card) {
  cardsContainer.prepend(initialCard.cloneNode(true));
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
  const title = image.nextElementSibling.querySelector('.title').textContent;
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
  const newCard = { name: newNameCard.value, link: newLinkCard.value };
  createCard(newCard);
  closePopup(addCartPopup);
  formAddCart.reset();
}
