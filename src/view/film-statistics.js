import {createElement, getRandomInteger} from '../utils.js';

const createAppFilmStatisticsTemplate = () => {
  const filmsQuantity = getRandomInteger(0, 20000);
  return `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>`;
};

export default class FilmsStatisticsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAppFilmStatisticsTemplate();
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
