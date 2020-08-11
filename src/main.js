import {FilmsCount} from './consts.js';
import {getRandomInteger} from './utils.js';
import {createAppUserTemplate} from './view/user.js';
import {createAppMainNavigationTemplate} from './view/main-nav.js';
import {createAppSortTemplate} from './view/sort.js';
import {createAppFilmsListTemplate} from './view/films-list.js';
import {createAppFilmTemplate} from './view/film.js';
import {createAppBtnShowMoreTemplate} from './view/btn-show-more.js';
import {createAppFilmPopupTemplate} from './view/film-popup.js';
import {createAppTopRatedFilmsTemplate} from './view/top-rated-films.js';
import {createAppMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {createAppFilmStatisticsTemplate} from './view/film-statistics.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';


const films = generateFilms();

const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const appHeaderElement = document.querySelector(`.header`);

render(appHeaderElement, createAppUserTemplate(), `beforeend`);

const appMainElement = document.querySelector(`.main`);

render(appMainElement, createAppSortTemplate(), `afterbegin`);

render(appMainElement, createAppMainNavigationTemplate(filters), `afterbegin`);

render(appMainElement, createAppFilmsListTemplate(), `beforeend`);

const appFilmsElement = appMainElement.querySelector(`.films`);
const appFilmsListElement = appFilmsElement.querySelector(`.films-list`);
const appFilmsListContainerElement = appFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
  render(appFilmsListContainerElement, createAppFilmTemplate(films[i]), `beforeend`);
}

if (films.length > FilmsCount.PER_STEP) {
  let renderedFilmsCount = FilmsCount.PER_STEP;

  render(appFilmsListElement, createAppBtnShowMoreTemplate(), `beforeend`);

  const loadMoreButton = appFilmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
    .forEach((film) => render(appFilmsListContainerElement, createAppFilmTemplate(film), `beforeend`));

    renderedFilmsCount += FilmsCount.PER_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }

  });
}

const appBodyElement = document.querySelector(`body`);

render(appBodyElement, createAppFilmPopupTemplate(films[getRandomInteger(0, films.length - 1)]), `beforeend`);

render(appFilmsElement, createAppTopRatedFilmsTemplate(), `beforeend`);
render(appFilmsElement, createAppMostCommentedFilmsTemplate(), `beforeend`);

const appFilmsExtraElements = appFilmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FilmsCount.EXTRA; j++) {
    render(el, createAppFilmTemplate(films[i]), `beforeend`);
  }
}

const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appFooterElement, createAppFilmStatisticsTemplate(), `beforeend`);
