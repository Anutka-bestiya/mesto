//Показать/скрыть невалидность input
const showInputError = () => {};

const hideInputError = () => {};

//Действия в случае валидности / не валидности формы
const checkInputValidity = input => {
  if (!input.validity.valid) {
    console.log(input.validity.valid);
    showInputError();
  } else {
    hideInputError();
  }
};
//Навешивание слушателей на форму
const setEventListener = (formList, formInputList) => {
  formInputList.forEach(input => {
    input.addEventListener('input', evt => {
      checkInputValidity(input);
    });
  });
};
//enableValidation запускает процесс наложения валидации на формы
//выбираю все формы
const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  const formInputList = Array.from(document.querySelectorAll(config.inputSelector));
  setEventListener(formList, formInputList);
};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
