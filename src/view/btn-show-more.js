import {createElement} from '../utils.js';

export const createAppBtnShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class BtnShowMoreView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAppBtnShowMoreTemplate();
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
