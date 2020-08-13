import {FilmsCount} from './consts.js';
import {getRandomInteger} from './utils.js';
import UserView from './view/user.js';
import MainNavigationView from './view/main-nav.js';
import SortView from './view/sort.js';
import FilmsListView from './view/films-list.js';
import FilmView from './view/film.js';
import BtnShowMoreView from './view/btn-show-more.js';
import FilmPopupView from './view/film-popup.js';
import FilmsTopRatedView from './view/top-rated-films.js';
import FilmsMostCommentedView from './view/most-commented-films.js';
import FilmsStatisticsView from './view/film-statistics.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {renderElement, RenderPosition} from "./utils.js";

const films = generateFilms();

const filters = generateFilter(films);

const appHeaderElement = document.querySelector(`.header`);

renderElement(appHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);

const appMainElement = document.querySelector(`.main`);

renderElement(appMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

renderElement(appMainElement, new MainNavigationView(filters).getElement(), RenderPosition.AFTERBEGIN);

renderElement(appMainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const appFilmsElement = appMainElement.querySelector(`.films`);
const appFilmsListElement = appFilmsElement.querySelector(`.films-list`);
const appFilmsListContainerElement = appFilmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
  renderElement(appFilmsListContainerElement, new FilmView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FilmsCount.PER_STEP) {
  let renderedFilmsCount = FilmsCount.PER_STEP;

  const loadMoreButton = new BtnShowMoreView();

  renderElement(appFilmsListElement, loadMoreButton.getElement(), RenderPosition.BEFOREEND);


  loadMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
      .forEach((film) => renderElement(appFilmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmsCount += FilmsCount.PER_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.removeElement();
    }

  });
}

const appBodyElement = document.querySelector(`body`);

renderElement(appBodyElement, new FilmPopupView(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.BEFOREEND);

renderElement(appFilmsElement, new FilmsTopRatedView().getElement(), RenderPosition.BEFOREEND);
renderElement(appFilmsElement, new FilmsMostCommentedView().getElement(), RenderPosition.BEFOREEND);

const appFilmsExtraElements = appFilmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FilmsCount.EXTRA; j++) {
    renderElement(el, new FilmView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
}

const appFooterElement = appBodyElement.querySelector(`.footer`);

renderElement(appFooterElement, new FilmsStatisticsView().getElement(), RenderPosition.BEFOREEND);
