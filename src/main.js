import {FilmsCount, CATEGORIES, NUMBER_OF_CATEGORIES} from './consts';
import {getRandomInteger} from './utils/common';
import UserView from './view/user';
import MainNavigationView from './view/main-nav';
import SortView from './view/sort';
import FilmsView from './view/films';
import FilmsListView from './view/films-list';
import FilmsContainerView from './view/films-container';
import FilmView from './view/film';
import BtnShowMoreView from './view/btn-show-more';
import FilmPopupView from './view/film-popup';
import FilmsExtraView from './view/films-extra';
import FilmsStatisticsView from './view/film-statistics';
import NoFilmsView from './view/no-films';
import {generateFilms} from './mock/film';
import {generateFilter} from './mock/filter';
import {render, RenderPosition, remove} from "./utils/render";

const allFilms = generateFilms();

const filters = generateFilter(allFilms);

const renderFilm = (filmsListElement, film) => {
  let {comments} = film;
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new FilmPopupView(film, comments);

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

  render(filmsListElement, filmComponent, RenderPosition.BEFOREEND);
};

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView(), RenderPosition.BEFOREEND);

render(appMainElement, new SortView(), RenderPosition.AFTERBEGIN);

render(appMainElement, new MainNavigationView(filters), RenderPosition.AFTERBEGIN);

const renderFilms = (filmsContainer, films) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView();
  const filmsContainerComponent = new FilmsContainerView();

  render(filmsContainer, filmsComponent, RenderPosition.BEFOREEND);

  render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);

  render(filmsListComponent, filmsContainerComponent, RenderPosition.BEFOREEND);

  if (films.length) {
    films
      .slice(0, Math.min(films.length, FilmsCount.PER_STEP))
      .forEach((film) => renderFilm(filmsContainerComponent.getElement(), film));

    if (films.length > FilmsCount.PER_STEP) {
      let renderedFilmsCount = FilmsCount.PER_STEP;

      const loadMoreButtonComponent = new BtnShowMoreView();

      render(filmsListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);


      loadMoreButtonComponent.setBtnClickHandler(() => {
        films
          .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.PER_STEP)
          .forEach((film) => renderFilm(filmsContainerComponent.getElement(), film));

        renderedFilmsCount += FilmsCount.PER_STEP;

        if (renderedFilmsCount >= films.length) {
          remove(loadMoreButtonComponent);
        }

      });
    }
  } else {
    render(filmsListComponent, new NoFilmsView(), RenderPosition.AFTERBEGIN);
  }

  for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
    render(filmsComponent, new FilmsExtraView(CATEGORIES[i]), RenderPosition.BEFOREEND);
  }

  const appFilmsExtraElements = filmsComponent.getElement().querySelectorAll(`.films-list--extra`);

  for (let i = 0; i < appFilmsExtraElements.length; i++) {
    const el = appFilmsExtraElements[i].querySelector(`.films-list__container`);
    for (let j = 0; j < FilmsCount.EXTRA; j++) {
      renderFilm(el, films[getRandomInteger(0, films.length - 1)]);
    }
  }
};


renderFilms(appMainElement, allFilms);

render(appFooterElement, new FilmsStatisticsView(), RenderPosition.BEFOREEND);
