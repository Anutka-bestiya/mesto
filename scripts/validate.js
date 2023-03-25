//Проверка валидности формы методом some
const hasInvalidInput = formInputTargetList => {
  return formInputTargetList.some(input => {
    return !input.validity.valid;
  });
};
//Активировать/дизактивировать кнопку submit
const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.disabled = true;
  submitButton.classList.add(inactiveButtonClass);
};
const activeButton = (submitButton, inactiveButtonClass) => {
  submitButton.disabled = false;
  submitButton.classList.remove(inactiveButtonClass);
};
//Поведение кнопки в зависимости от валидности
const toggleButtonState = (input, formInputTargetList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(formInputTargetList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    activeButton(submitButton, inactiveButtonClass);
  }
};
//Показать/скрыть невалидность input
const showInputError = (input, validationMessage, formErrorSpan, config) => {
  formErrorSpan.classList.add(`${config.errorClass}_visible`);
  formErrorSpan.textContent = validationMessage;
  input.classList.add(config.inputErrorClass);
};
const hideInputError = (input, formErrorSpan, config) => {
  formErrorSpan.classList.remove(`${config.errorClass}_visible`);
  formErrorSpan.textContent = '';
  input.classList.remove(config.inputErrorClass);
};
//Действия в случае валидности / не валидности формы
const checkInputValidity = (input, config) => {
  const formErrorSpan = document.querySelector(`.${config.errorClass}-${input.name}`);
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, formErrorSpan, config);
  } else {
    hideInputError(input, formErrorSpan, config);
  }
};
//Навешивание слушателей на форму
const setEventListener = (formInputList, config) => {
  formInputList.forEach(input => {
    input.addEventListener('input', evt => {
      const formTargetList = evt.target.closest(config.formSelector);
      const submitButton = formTargetList.querySelector(config.submitButtonSelector);
      const formInputTargetList = Array.from(formTargetList.querySelectorAll(config.inputSelector));
      checkInputValidity(input, config);
      toggleButtonState(input, formInputTargetList, submitButton, config.inactiveButtonClass);
    });
  });
};
//enableValidation запускает процесс наложения валидации на формы
//выбираю все формы
const enableValidation = config => {
  const formInputList = document.querySelectorAll(config.inputSelector);
  setEventListener(formInputList, config);
};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
});
