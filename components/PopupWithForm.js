import Popup from "./Popup.js";
//since we are extending popupwithfrom class need to import popup class
//extends is making popupwithform a child class of popup
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    //saving handleformsubmit to the this object
    this._handleFormSubmit = handleFormSubmit;
    // left saving to the this object
    //right side of equal is searching the form for the list of input elements using queryall
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      //added a key/value pair to the values object for each input
      inputValues[input.name] = input.value; // <--bracket notation because input.name is a variable (not a literal string)
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}

export default PopupWithForm;
