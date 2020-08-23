import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsContainerView from '../view/films-container';
import FilmView from '../view/film';
import BtnShowMoreView from '../view/btn-show-more';
import FilmPopupView from '../view/film-popup';
import FilmsExtraView from '../view/films-extra';
import NoFilmsView from '../view/no-films';
import SortView from '../view/sort';

import {
  FilmsCount,
  CATEGORIES,
  NUMBER_OF_CATEGORIES
} from '../consts';

import {
  render,
  RenderPosition,
  remove
} from "../utils/render";

import {getRandomInteger} from '../utils/common';


export default class MovieList {

  constructor(container) {
    this._container = container;
    this._renderedFilmsCount = FilmsCount.PER_STEP;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmComponent = new FilmView();
    this._filmPopupComponent = new FilmPopupView();
    this._btnShowMoreComponent = new BtnShowMoreView();
    this._sortComponent = new SortView();

    this._handleBtnShowMoreClick = this._handleBtnShowMoreClick.bind(this);

  }

  init(films) {
    this._films = films.slice();
    this._renderSort();
    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsContainer();
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film, containerElement = this._filmsContainerComponent) {
    let {comments} = film;

    const filmComponent = new FilmView(film);
    const filmPopupComponent = new FilmPopupView(film, comments);

    const showPopup = () => {
      this._filmsListComponent.getElement().appendChild(filmPopupComponent.getElement());
    };

    const closePopup = () => {
      this._filmsListComponent.getElement().removeChild(filmPopupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmComponent.setTitleClickHandler(() => {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmComponent.setPosterClickHandler(() => {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmPopupComponent.setCloseBtnClickHandler(() => {
      closePopup();
    });

    filmPopupComponent.setFormSubmitHandler(() => {
      closePopup();
    });

    render(containerElement, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleBtnShowMoreClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FilmsCount.PER_STEP);
    this._renderedFilmsCount += FilmsCount.PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._btnShowMoreComponent);
    }
  }

  _renderBtnShowMore() {

    render(this._filmsListComponent, this._btnShowMoreComponent, RenderPosition.BEFOREEND);


    this._btnShowMoreComponent.setBtnClickHandler(this._handleBtnShowMoreClick);
  }

  _renderFilmsExtra() {

    for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
      render(this._filmsComponent, new FilmsExtraView(CATEGORIES[i]), RenderPosition.BEFOREEND);
    }

    const appFilmsExtraElements = this._filmsComponent.getElement().querySelectorAll(`.films-list--extra`);

    for (let i = 0; i < appFilmsExtraElements.length; i++) {

      const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);

      for (let j = 0; j < FilmsCount.EXTRA; j++) {
        this._renderFilm(this._films[getRandomInteger(0, this._films.length - 1)], el);
      }
    }

  }

  _renderFilmsContainer() {

    if (this._films.length) {
      this._renderFilms(0, Math.min(this._films.length, FilmsCount.PER_STEP));

      if (this._films.length > FilmsCount.PER_STEP) {
        this._renderBtnShowMore();
      }

      this._renderFilmsExtra();

    } else {
      this._renderNoFilms();
    }

  }

}
