import {createAppUserTemplate} from './view/user.js';
import {createAppMainNavigationTemplate} from './view/main-nav.js';
import {createAppSortTemplate} from './view/sort.js';
import {createAppFilmsListTemplate} from './view/films-list.js';
import {createAppFilmTemplate} from './view/film.js';
import {createAppBtnShowMoreTemplate} from './view/btn-show-more.js';
import {createAppFilmPopupTemplate} from './view/film-popup.js';
import {createAppTopRatedFilmsTemplate} from './view/top-rated-films.js';
import {createAppMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {FILMS_COUNT} from './consts.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const appHeaderElement = document.querySelector(`.header`);

render(appHeaderElement, createAppUserTemplate(), `beforeend`);

const appMainElement = document.querySelector(`.main`);

render(appMainElement, createAppSortTemplate(), `afterbegin`);

render(appMainElement, createAppMainNavigationTemplate(), `afterbegin`);

render(appMainElement, createAppFilmsListTemplate(), `beforeend`);

const appFilmsElement = appMainElement.querySelector(`.films`);
const appFilmsListElement = appFilmsElement.querySelector(`.films-list`);
const appFilmsListContainerElement = appFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT.MAIN; i++) {
  render(appFilmsListContainerElement, createAppFilmTemplate(), `beforeend`);
}

render(appFilmsListElement, createAppBtnShowMoreTemplate(), `beforeend`);

const appBodyElement = document.querySelector(`body`);

render(appBodyElement, createAppFilmPopupTemplate(), `beforeend`);

render(appFilmsElement, createAppTopRatedFilmsTemplate(), `beforeend`);
render(appFilmsElement, createAppMostCommentedFilmsTemplate(), `beforeend`);

const appFilmsExtraElements = appFilmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FILMS_COUNT.EXTRA; j++) {
    render(el, createAppFilmTemplate(), `beforeend`);
  }
}
