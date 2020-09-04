import FilmView from '../view/film';
import FilmPopupView from '../view/film-popup';

import {render, replace, remove, RenderPosition} from '../utils/render';

import {Mode} from '../consts';

export default class FilmPresenter {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);

    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
  }

  init(film) {
    this._film = film;

    let {comments} = film;
    this._comments = comments;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film, this._comments);

    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmPopupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._filmPopupComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _showPopup() {
    replace(this._filmPopupComponent, this._filmComponent);
    this._changeMode();
    this._mode = Mode.POPUP;
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopup() {
    replace(this._filmComponent, this._filmPopupComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleTitleClick() {
    this._showPopup();
  }

  _handlePosterClick() {
    this._showPopup();
  }

  _handleCloseBtnClick() {
    this._closePopup();
  }

  _handleFormSubmit(film) {
    this._changeData(film);
    this._closePopup();
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoritesClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
