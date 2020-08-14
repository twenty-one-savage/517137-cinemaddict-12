import {createElement} from '../utils.js';
import {createAppFilmPopupTemplate} from './film-popup.js';

const createAppFilmTemplate = (film) => {
  const {poster, name, rating, yearOfProduction, duration, genre, description, commentsQuantity} = film;
  return `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${yearOfProduction}</span>
          <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${commentsQuantity} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`;
};

export default class FilmView {
  constructor(film) {
    this._film = film;
    this._element = null;
    this._popup = null;
  }

  getTemplate() {
    return createAppFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getPopup() {
    return createAppFilmPopupTemplate(this._film);
  }

  getPopupElement() {
    if (!this._popup) {
      this._popup = createElement(this.getTemplate());
    }

    return this._popup;
  }

  removeElement() {
    this._element = null;
  }
}
