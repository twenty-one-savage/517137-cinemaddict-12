import {FilmsCount, CATEGORIES, NUMBER_OF_CATEGORIES} from './consts.js';
import {getRandomInteger} from './utils.js';
import UserView from './view/user.js';
import MainNavigationView from './view/main-nav.js';
import SortView from './view/sort.js';
import FilmsListView from './view/films-list.js';
import FilmView from './view/film.js';
import BtnShowMoreView from './view/btn-show-more.js';
// import FilmPopupView from './view/film-popup.js';
import FilmsInCategoryView from './view/films-in-category.js';
import FilmsStatisticsView from './view/film-statistics.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from "./utils.js";

const films = generateFilms();

const filters = generateFilter(films);

const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmView(film);
  // const filmPopupComponent = new FilmPopupView(film);

  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);

render(appMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

render(appMainElement, new MainNavigationView(filters).getElement(), RenderPosition.AFTERBEGIN);

let filmsListComponent = new FilmsListView();

render(appMainElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
  renderFilm(filmsListComponent.getElement().querySelector(`.films-list__container`), films[i]);
}

if (films.length > FilmsCount.PER_STEP) {
  let renderedFilmsCount = FilmsCount.PER_STEP;

  const loadMoreButton = new BtnShowMoreView();

  render(filmsListComponent.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);


  loadMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
      .forEach((film) => renderFilm(filmsListComponent.getElement(), film));

    renderedFilmsCount += FilmsCount.PER_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.removeElement();
    }

  });
}
// TODO: Popup
// render(appBodyElement, new FilmView(films[getRandomInteger(0, films.length - 1)]).getPopupElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
  render(filmsListComponent.getElement(), new FilmsInCategoryView(CATEGORIES[i]).getElement(), RenderPosition.BEFOREEND);
}

const appFilmsExtraElements = filmsListComponent.getElement().querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FilmsCount.EXTRA; j++) {
    render(el, new FilmView(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.BEFOREEND);
  }
}

render(appFooterElement, new FilmsStatisticsView().getElement(), RenderPosition.BEFOREEND);
