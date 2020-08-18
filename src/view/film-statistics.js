import {createElement, getRandomInteger} from '../utils';
import {FilmsCount} from '../consts';


export default class FilmsStatisticsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    const filmsQuantity = getRandomInteger(0, FilmsCount.ALL_FILMS);
    return `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
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
