//Проверка валидности формы методом some
const hasInvalidInput = form => {
  return Array.from(form).some(input => {
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
const toggleButtonState = (form, subbtn, inactiveButtonClass) => {
  if (hasInvalidInput(form)) {
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
const checkInputValidity = (form, input, config) => {
  const formErrorSpan = form.querySelector(`.${config.errorClass}-${input.name}`);

  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, formErrorSpan, config);
  } else {
    hideInputError(input, formErrorSpan, config);
  }
};
//Навешивание слушателей на форму
const setEventListener = (form, formInputList, config) => {
  formInputList.forEach(input => {
    const subbtn = form.querySelector(config.submitButtonSelector);
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(form, subbtn, config.inactiveButtonClass);
    });
  });
};
//enableValidation запускает процесс наложения валидации на формы
//выбираю все формы
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(form => {
    const formInputList = Array.from(form.querySelectorAll(config.inputSelector));

    setEventListener(form, formInputList, config);
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
