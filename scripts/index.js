console.log('Hello');

const editPopup = document.querySelector('.edit-popup');
if (!editPopup) {
  throw new Error('No editPopup');
}

const editProfileOpenButton = document.querySelector('.profile__edit-button');
if (!editProfileOpenButton) {
  throw new Error('No editProfileOpenButton');
}

const editProfileCloseButton = document.querySelector('.profile__close-button');
if (!editProfileCloseButton) {
  throw new Error('No editProfileCloseButton');
}

editProfileOpenButton.addEventListener('click', function () {
  openEditPopup(editPopup);
});
editProfileCloseButton.addEventListener('click', function () {
  closeEditPopup(editPopup);
});
function openEditPopup(popup) {
  popup.classList.add('popup_opened');
}

function closeEditPoput(popup) {
  popup.classList.remove('popup_opened');
}

const userName = 'Жак-Ив Кусто';
const userAbout = 'Исследователь океана';
const userNameElement = document.querySelector('.user__name');
userNameElement.textContent = userName;
const userAboutElement = document.querySelector('.user__about');
userAboutElement.textContent = userAbout;
