import {createElement} from '../utils.js';

const createFilmsCategoryTemplate = (category) => {
  return `<section class="films-list--extra">
        <h2 class="films-list__title">${category}</h2>
        <div class="films-list__container"></div>
      </section>`;
};

export default class FilmsExtraView {
  constructor(category) {
    this._category = category;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCategoryTemplate(this._category);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
