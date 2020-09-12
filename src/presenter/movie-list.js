import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsContainerView from '../view/films-container';
import BtnShowMoreView from '../view/btn-show-more';
import FilmsExtraView from '../view/films-extra';
import NoFilmsView from '../view/no-films';
import SortView from '../view/sort';

import FilmPresenter from './film';

import {
  sortFilmDate,
  sortFilmRating
} from "../utils/film";

import {
  FilmsCount,
  CATEGORIES,
  SortType,
  UserAction,
  UpdateType
} from '../consts';

import {
  render,
  RenderPosition,
  remove
} from "../utils/render";

export default class MovieList {

  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._renderedFilmsCount = FilmsCount.PER_STEP;
    this._filmMainPresenter = {};
    this._filmExtraPresenter = {};

    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._btnShowMoreComponent = new BtnShowMoreView();
    this._noFilmsComponent = new NoFilmsView();

    this._filmsExtraComponent = null;
    this._filmsExtraComponents = [];

    this._currenSortType = SortType.DEFAULT;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleBtnShowMoreClick = this._handleBtnShowMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();
    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
    this._renderFilmsExtra();
  }

  _getFilms() {
    switch (this._currenSortType) {
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmRating).reverse();
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmDate).reverse();
    }

    return this._filmsModel.getFilms();
  }

  _renderSort() {
    if (this._getFilms().length > 1) {
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderFilm(film, container = this._filmsContainerComponent, presenter = this._filmMainPresenter) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    presenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsExtra() {

    if (this._getFilms().length) {
      const createCategoryFilms = (attribute) => {
        return this._getFilms().slice().sort((a, b) => b[attribute] - a[attribute]).splice(0, FilmsCount.EXTRA);
      };

      const topRatedFilms = createCategoryFilms(`rating`);
      const mostCommentedFilms = createCategoryFilms(`commentsQuantity`);

      const renderCategorySection = (category, categoriesFilms) => {
        this._filmsExtraComponent = new FilmsExtraView(category);

        this._filmsExtraComponents.push(this._filmsExtraComponent);

        const categoryContainerElement = new FilmsContainerView();

        render(this._filmsComponent, this._filmsExtraComponent, RenderPosition.BEFOREEND);
        render(this._filmsExtraComponent, categoryContainerElement, RenderPosition.BEFOREEND);

        categoriesFilms.forEach((film) => this._renderFilm(film, categoryContainerElement, this._filmExtraPresenter));
      };

      Object
        .values(CATEGORIES)
        .forEach((category) => {
          switch (category) {
            case CATEGORIES.topRated:
              renderCategorySection(category, topRatedFilms);
              break;
            case CATEGORIES.mostCommented:
              renderCategorySection(category, mostCommentedFilms);
              break;
          }
        });
    }
  }

  _renderMovieList() {

    if (!this._getFilms().length) {
      this._renderNoFilms();
      return;
    }

    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, FilmsCount.PER_STEP));

    this._renderFilms(films);

    if (filmsCount > FilmsCount.PER_STEP) {
      this._renderBtnShowMore();
    }

  }

  _renderBtnShowMore() {
    this._btnShowMoreComponent.setBtnClickHandler(this._handleBtnShowMoreClick);
    render(this._filmsListComponent, this._btnShowMoreComponent, RenderPosition.BEFOREEND);
  }

  _handleModeChange() {
    Object
       .values(this._filmMainPresenter)
       .forEach((presenter) => presenter.resetView());

    Object
      .values(this._filmExtraPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, updatedFilm) {
    switch (updateType) {
      case UpdateType.PATCH:

        if (this._filmMainPresenter[updatedFilm.id] === undefined) {
          this._filmExtraPresenter[updatedFilm.id].init(updatedFilm);
        } else {
          this._filmMainPresenter[updatedFilm.id].init(updatedFilm);
        }

        this._clearFilmsExtra();
        this._renderFilmsExtra();
        break;

      case UpdateType.MAJOR:

        this._clearMovieList();
        this._clearFilmsExtra();

        this._renderMovieList();
        this._renderFilmsExtra();
        break;
    }
  }

  _handleBtnShowMoreClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FilmsCount.PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

    this._renderFilms(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._btnShowMoreComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._currenSortType = sortType;
    this._clearMovieList();
    this._renderMovieList();
  }

  _clearMovieList() {
    Object
      .values(this._filmMainPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
    this._filmMainPresenter = {};
    this._renderedFilmsCount = FilmsCount.PER_STEP;
  }

  _clearFilmsExtra() {
    this._filmsExtraComponents.forEach((el) => {
      el.getElement().remove();
      el.removeElement();
    });

    this._filmsExtraComponents = [];

    Object
      .values(this._filmExtraPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
    this._filmExtraPresenter = {};
  }
}
