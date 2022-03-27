export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, toBeginning=true) {
        if (toBeginning) {
            this._container.append(element);
          } else {
            this._container.prepend(element);
          }
    }

    renderItems() {
      this._renderedItems.forEach(item => {
        this._renderer(item);        
      });
    }
}