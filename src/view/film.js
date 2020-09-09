import AbstractView from './absrtact';

export default class FilmView extends AbstractView {
  constructor(film) {
    super();

    this._film = film;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._filmControlsClickHandler = this._filmControlsClickHandler.bind(this);
  }

  getTemplate() {
    const {
      poster,
      name,
      rating,
      yearOfProduction,
      duration,
      genres,
      description,
      commentsQuantity,
      isWatchlist,
      isWatched,
      isFavorite
    } = this._film;

    return `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearOfProduction}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsQuantity} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? ` film-card__controls-item--active` : ``}"> Add to watchlist </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? ` film-card__controls-item--active` : ``}"> Mark as watched </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? ` film-card__controls-item--active` : ``}"> Mark as favorite </button>
      </form>
    </article>`;
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this.getElement().addEventListener(`click`, this._filmCardClickHandler);
  }

  setFilmControlsClickHandler(callback) {
    this._callback.filmControlsClick = callback;
    this.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, this._filmControlsClickHandler);
  }

  _filmCardClickHandler(evt) {
    let target = evt.target;

    const title = this.getElement().querySelector(`.film-card__title`);
    const poster = this.getElement().querySelector(`.film-card__poster`);
    const comment = this.getElement().querySelector(`.film-card__comments`);

    if (target === title || target === poster || target === comment) {
      this._callback.filmCardClick();
    }
  }

  _filmControlsClickHandler(evt) {
    let target = evt.target;

    const watchList = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    const watched = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    const favorite = this.getElement().querySelector(`.film-card__controls-item--favorite`);

    if (target === watchList || target === watched || target === favorite) {

      switch (target) {
        case watchList:
          this._callback.filmControlsClick(`isWatchlist`);
          break;
        case watched:
          this._callback.filmControlsClick(`isWatched`);
          break;
        case favorite:
          this._callback.filmControlsClick(`isFavorite`);
          break;
      }
    }
  }
}
