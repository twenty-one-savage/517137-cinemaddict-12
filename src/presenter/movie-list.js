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
  SortType
} from '../consts';

import {
  render,
  RenderPosition,
  remove
} from "../utils/render";

export default class MovieList {

  constructor(container) {
    this._container = container;
    this._renderedFilmsCount = FilmsCount.PER_STEP;
    this._filmPresenter = {};

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();

    this._filmsExtraComponent = null;

    this._noFilmsComponent = new NoFilmsView();
    this._btnShowMoreComponent = new BtnShowMoreView();
    this._sortComponent = new SortView();
    this._currenSortType = SortType.DEFAULT;

    this._handleBtnShowMoreClick = this._handleBtnShowMoreClick.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderSort();

    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
    this._renderFilmsExtra(this._films);
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container = this._filmsContainerComponent) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
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

  _renderFilmsExtra(films) {

    const createCategoryFilms = (attribute) => {
      return films.slice().sort((a, b) => b[attribute] - a[attribute]).splice(0, FilmsCount.EXTRA);
    };

    const topRatedFilms = createCategoryFilms(`rating`);
    const mostCommentedFilms = createCategoryFilms(`commentsQuantity`);

    const renderCategorySection = (category, categoriesFilms) => {
      this._filmsExtraComponent = new FilmsExtraView(category);

      render(this._filmsComponent, this._filmsExtraComponent, RenderPosition.BEFOREEND);

      const categoryContainerElement = this._filmsExtraComponent.getElement().querySelector(`.films-list__container`);

      categoriesFilms.forEach((film) => this._renderFilm(film, categoryContainerElement));

    };

    Object
      .values(CATEGORIES)
      .forEach((category) => {
        if (category === `Top Rated`) {
          renderCategorySection(category, topRatedFilms);
        } else if (category === `Most Commented`) {
          renderCategorySection(category, mostCommentedFilms);
        }
      });
  }

  _renderMovieList() {

    if (this._films.length < 1) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(0, Math.min(this._films.length, FilmsCount.PER_STEP));

    if (this._films.length > FilmsCount.PER_STEP) {
      this._renderBtnShowMore();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);

    this._clearMovieList();
    this._renderMovieList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._films.sort(sortFilmRating).reverse();
        break;
      case SortType.DATE:
        this._films.sort(sortFilmDate).reverse();
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currenSortType = sortType;
  }

  _clearMovieList() {
    this._filmsContainerComponent.getElement().innerHTML = ``;
    // Object
    //   .values(this._filmPresenter)
    //   .forEach((presenter) => {
    //     presenter.destroy();
    //   });
    // this._filmPresenter = {};
    this._renderedFilmsCount = FilmsCount.PER_STEP;
  }
}
