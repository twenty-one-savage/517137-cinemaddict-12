import {FilmsCount, CATEGORIES, NUMBER_OF_CATEGORIES} from './consts.js';
import {getRandomInteger} from './utils.js';
import UserView from './view/user.js';
import MainNavigationView from './view/main-nav.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsContainerView from './view/films-container.js';
import FilmView from './view/film.js';
import BtnShowMoreView from './view/btn-show-more.js';
import FilmPopupView from './view/film-popup.js';
import FilmsInCategoryView from './view/films-in-category.js';
import FilmsStatisticsView from './view/film-statistics.js';
import NoFilmsView from './view/no-films.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from "./utils.js";

const films = generateFilms();

const filters = generateFilter(films);

const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const showPopup = () => {
    filmsListElement.appendChild(filmPopupComponent.getElement());
  };

  const closePopup = () => {
    filmsListElement.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    showPopup();
  });

  filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopup();
  });


  filmPopupComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    closePopup();
  });

  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);

render(appMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

render(appMainElement, new MainNavigationView(filters).getElement(), RenderPosition.AFTERBEGIN);

let filmsComponent = new FilmsView();

render(appMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

let filmsListComponent = new FilmsListView();

render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

let filmsContainerComponent = new FilmsContainerView();

render(filmsListComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

if (films.length) {
  for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
    renderFilm(filmsContainerComponent.getElement(), films[i]);
  }

  if (films.length > FilmsCount.PER_STEP) {
    let renderedFilmsCount = FilmsCount.PER_STEP;

    const loadMoreButtonComponent = new BtnShowMoreView();

    render(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
        .forEach((film) => renderFilm(filmsContainerComponent.getElement(), film));

      renderedFilmsCount += FilmsCount.PER_STEP;

      if (renderedFilmsCount >= films.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }

    });
  }
} else {
  render(filmsListComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
  render(filmsComponent.getElement(), new FilmsInCategoryView(CATEGORIES[i]).getElement(), RenderPosition.BEFOREEND);
}

const appFilmsExtraElements = filmsComponent.getElement().querySelectorAll(`.films-list--extra`);

for (let i = 0; i < appFilmsExtraElements.length; i++) {
  const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FilmsCount.EXTRA; j++) {
    renderFilm(el, films[getRandomInteger(0, films.length - 1)]);
  }
}

render(appFooterElement, new FilmsStatisticsView().getElement(), RenderPosition.BEFOREEND);
