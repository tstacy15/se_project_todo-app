class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      //calling the renderer and passing it the item as an argument
      this._renderer(item);
    });
  }

  addItem(element) {
    //add element to the container
    this._container.append(element);
  }
}

export default Section;
