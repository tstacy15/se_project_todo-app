class Popup {
  constructor({ popupSelector }) {
    //selecting the popup element and saving it to the this object using the popupSelector
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    //event listener checking key when modal is opened
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      // If we click on the close button
      if (evt.target.closest(".popup__close")) {
        this.close();
      }
      // If we click directly on the overlay background
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}

export default Popup;
