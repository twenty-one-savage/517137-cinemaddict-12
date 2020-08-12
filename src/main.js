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
import {renderTemplate} from './utils.js';


const films = generateFilms();

const filters = generateFilter(films);

const appHeaderElement = document.querySelector(`.header`);

renderTemplate(appHeaderElement, createAppUserTemplate(), `beforeend`);

const appMainElement = document.querySelector(`.main`);

renderTemplate(appMainElement, createAppSortTemplate(), `afterbegin`);

renderTemplate(appMainElement, createAppMainNavigationTemplate(filters), `afterbegin`);

renderTemplate(appMainElement, createAppFilmsListTemplate(), `beforeend`);

const appFilmsElement = appMainElement.querySelector(`.films`);
const appFilmsListElement = appFilmsElement.querySelector(`.films-list`);
const appFilmsListContainerElement = appFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
  renderTemplate(appFilmsListContainerElement, createAppFilmTemplate(films[i]), `beforeend`);
}

if (films.length > FilmsCount.PER_STEP) {
  let renderedFilmsCount = FilmsCount.PER_STEP;

  renderTemplate(appFilmsListElement, createAppBtnShowMoreTemplate(), `beforeend`);

  const loadMoreButton = appFilmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
    .forEach((film) => renderTemplate(appFilmsListContainerElement, createAppFilmTemplate(film), `beforeend`));

    renderedFilmsCount += FilmsCount.PER_STEP;

    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }

  });
}

const appBodyElement = document.querySelector(`body`);

renderTemplate(appBodyElement, createAppFilmPopupTemplate(films[getRandomInteger(0, films.length - 1)]), `beforeend`);

renderTemplate(appFilmsElement, createAppTopRatedFilmsTemplate(), `beforeend`);
renderTemplate(appFilmsElement, createAppMostCommentedFilmsTemplate(), `beforeend`);

const appFilmsExtraElements = appFilmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FilmsCount.EXTRA; j++) {
    renderTemplate(el, createAppFilmTemplate(films[i]), `beforeend`);
  }
}

const appFooterElement = appBodyElement.querySelector(`.footer`);

renderTemplate(appFooterElement, createAppFilmStatisticsTemplate(), `beforeend`);
