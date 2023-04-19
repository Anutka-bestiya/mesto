export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formInputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._subbtn = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _hasInvalidInput = () => {
    return this._formInputList.some(input => {
      return !input.validity.valid;
    });
  };

  _disableButton = () => {
    this._subbtn.disabled = true;
    this._subbtn.classList.add(this._config.inactiveButtonClass);
  };

  _activeButton = () => {
    this._subbtn.disabled = false;
    this._subbtn.classList.remove(this._config.inactiveButtonClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activeButton();
    }
  };

  _hideInputError = input => {
    const formErrorSpan = this._formElement.querySelector(
      `.${this._config.errorClass}-${input.name}`
    );
    formErrorSpan.classList.remove(`${this._config.errorClass}_visible`);
    formErrorSpan.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  };

  _showInputError = input => {
    const formErrorSpan = this._formElement.querySelector(
      `.${this._config.errorClass}-${input.name}`
    );
    formErrorSpan.classList.add(`${this._config.errorClass}_visible`);
    formErrorSpan.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  resetError = () => {
    this._formInputList.forEach(input => {
      this._hideInputError(input);
    });
    this._disableButton();
  };

  _checkInputValidity = input => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListener = () => {
    this._formInputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListener();
  };
}
