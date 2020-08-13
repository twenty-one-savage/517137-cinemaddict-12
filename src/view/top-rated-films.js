import {createElement} from '../utils.js';

const createAppTopRatedFilmsTemplate = () => {
  return `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>`;
};

export default class FilmsTopRatedView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAppTopRatedFilmsTemplate();
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
