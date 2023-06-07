export class Section {
  constructor(renderer, insertSelector) {
    this._renderer = renderer;
    this._container = insertSelector;
  }

  renderItems(cards) {
    cards.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
