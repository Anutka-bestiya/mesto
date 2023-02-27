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
}

let formElement = document.querySelector('.form-edit');
console.log(formElement);
let nameInput = formElement.querySelector('.form-user-name');
console.log(nameInput);
let aboutInput = formElement.querySelector('.form-user-about');
console.log(aboutInput);
if (!nameInput) {
  throw new Error('No nameInput');
}
if (!aboutInput) {
  throw new Error('No aboutInput');
}
nameInput.getAttribute('value');
console.log(nameInput.value);
aboutInput.getAttribute('value');
console.log(aboutInput.value);

let userNameElement = document.querySelector('.user-name');
let userAboutElement = document.querySelector('.user-about');
if (!userNameElement) {
  throw new Error('No userNameElement');
}
if (!userAboutElement) {
  throw new Error('No userAboutElement');
}
userNameElement.textContent = nameInput.value;
userAboutElement.textContent = aboutInput.value;
console.log(userNameElement.textContent);
console.log(userAboutElement.textContent);

formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();

  userName = nameInput.value;
  console.log(userName);
  userAbout = aboutInput.value;
  console.log(userAbout);

  userNameElement.textContent = userName;
  userAboutElement.textContent = userAbout;
  console.log(userNameElement.textContent);
  console.log(userAboutElement.textContent);

  closeEditPopup(editPopup);
}
