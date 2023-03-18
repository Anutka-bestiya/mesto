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
  openEditPopup(editPopup);
});
editProfileCloseButton.addEventListener('click', function () {
  closeEditPopup(editPopup);
});
function openEditPopup() {
  editPopup.classList.add('popup_opened');
}
function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
  const popup = document.querySelector('.popup');
  popup.style.transition = 'visibility 0s 3s, opacity 3s ease-in-out';
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
  closeEditPopup(editPopup);
}
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
//Создание карт из массива
const photoGaleryElements = document.querySelector('.elements');
const createCard = card => {
  const initialCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardName = initialCard.querySelector('.element__title');
  cardName.textContent = card.name;
  const cardImage = initialCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Фотография ${card.name}`);
  const elementDeleteButton = initialCard.querySelector('.button-card-delete');
  elementDeleteButton.addEventListener('click', elementDeleteClick);
  photoGaleryElements.append(initialCard);
};
initialCards.forEach(createCard);
//удаление карточки
function elementDeleteClick(event) {
  const button = event.target;
  const card = button.closest('.elements__list');
  card.remove();
}
