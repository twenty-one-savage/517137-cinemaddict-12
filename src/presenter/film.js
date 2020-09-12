import FilmView from '../view/film';
import FilmPopupView from '../view/film-popup';

import {render, replace, remove, RenderPosition} from '../utils/render';

import {Mode, UserAction, UpdateType} from '../consts';

import {isEscKeyPress} from '../utils/common';

export default class FilmPresenter {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleControlsClick = this._handleControlsClick.bind(this);

    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    let {comments} = film;
    this._comments = comments;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film, this._comments);

    this._filmComponent.setFilmCardClickHandler(this._handleFilmCardClick);
    this._filmComponent.setFilmControlsClickHandler(this._handleControlsClick);

    this._filmPopupComponent.setFilmPopupControlsHandler(this._handleControlsClick);

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
    if (isEscKeyPress) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleFilmCardClick() {
    this._showPopup();
  }

  _handleControlsClick(key) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              [key]: !this._film[key]
            }
        )
    );
  }

  _handleCloseBtnClick() {
    this._closePopup();
  }

  _handleFormSubmit(film) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        film
    );
    this._closePopup();
  }

}
