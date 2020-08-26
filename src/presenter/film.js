import FilmView from '../view/film';
import FilmPopupView from '../view/film-popup';

import {render, replace, RenderPosition} from '../utils/render';

export default class FilmPresenter {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handlePosterClick = this._handlePosterClick.bind(this);

    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    let {comments} = film;


    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film, comments);

    this._filmComponent.setTitleClickHandler(this._handleTitleClick);
    this._filmComponent.setPosterClickHandler(this._handlePosterClick);
    this._filmPopupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._filmPopupComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _showPopup() {
    replace(this._filmPopupComponent, this._filmComponent);
  }

  _closePopup() {
    replace(this._filmComponent, this._filmPopupComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleTitleClick() {
    this._showPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handlePosterClick() {
    this._showPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleCloseBtnClick() {
    this._closePopup();
  }

  _handleFormSubmit() {
    this._closePopup();
  }
}
