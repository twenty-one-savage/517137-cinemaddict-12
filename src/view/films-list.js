import {createElement} from "../utils";

export default class FilmsListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          </section>`;
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
