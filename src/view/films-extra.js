import {createElement} from '../utils.js';

export default class FilmsExtraView {
  constructor(category) {
    this._category = category;
    this._element = null;
  }

  getTemplate(category) {
    return `<section class="films-list--extra">
        <h2 class="films-list__title">${category}</h2>
        <div class="films-list__container"></div>
      </section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._category));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
