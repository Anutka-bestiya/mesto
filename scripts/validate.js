//Проверка валидности формы методом some
const hasInvalidInput = inputList => {
  return Array.from(inputList).some(input => {
    return !input.validity.valid;
  });
};
//Активировать/дизактивировать кнопку submit
const disableButton = (subbtn, inactiveButtonClass) => {
  subbtn.disabled = true;
  subbtn.classList.add(inactiveButtonClass);
};
const activeButton = (subbtn, inactiveButtonClass) => {
  subbtn.disabled = false;
  subbtn.classList.remove(inactiveButtonClass);
};
//Поведение кнопки в зависимости от валидности
const toggleButtonState = (inputList, subbtn, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(subbtn, inactiveButtonClass);
  } else {
    activeButton(subbtn, inactiveButtonClass);
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
const checkInputValidity = (inputList, input, config) => {
  const formErrorSpan = inputList.querySelector(`.${config.errorClass}-${input.name}`);

  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, formErrorSpan, config);
  } else {
    hideInputError(input, formErrorSpan, config);
  }
};
//Навешивание слушателей на форму
const setEventListener = (inputList, formInputList, config) => {
  formInputList.forEach(input => {
    input.addEventListener('input', () => {
      const subbtn = inputList.querySelector(config.submitButtonSelector);
      checkInputValidity(inputList, input, config);
      toggleButtonState(inputList, subbtn, config.inactiveButtonClass);
    });
  });
};
//enableValidation запускает процесс наложения валидации на формы
//выбираю все формы
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(inputList => {
    const formInputList = Array.from(inputList.querySelectorAll(config.inputSelector));

    setEventListener(inputList, formInputList, config);
  });
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
