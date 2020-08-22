import {FilmsCount, CATEGORIES, NUMBER_OF_CATEGORIES} from './consts';
import {getRandomInteger} from './utils';
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
import {render, RenderPosition} from "./utils";

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

  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView().getElement(), RenderPosition.BEFOREEND);

render(appMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

render(appMainElement, new MainNavigationView(filters).getElement(), RenderPosition.AFTERBEGIN);

const renderFilms = (filmsContainer, films) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView();
  const filmsContainerComponent = new FilmsContainerView();

  render(filmsContainer, filmsComponent.getElement(), RenderPosition.BEFOREEND);

  render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

  render(filmsListComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length) {
    for (let i = 0; i < Math.min(films.length, FilmsCount.PER_STEP); i++) {
      renderFilm(filmsContainerComponent.getElement(), films[i]);
    }

    if (films.length > FilmsCount.PER_STEP) {
      let renderedFilmsCount = FilmsCount.PER_STEP;

      const loadMoreButtonComponent = new BtnShowMoreView();

      render(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


      loadMoreButtonComponent.setBtnClickHandler(() => {
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
    render(filmsComponent.getElement(), new FilmsExtraView(CATEGORIES[i]).getElement(), RenderPosition.BEFOREEND);
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

render(appFooterElement, new FilmsStatisticsView().getElement(), RenderPosition.BEFOREEND);
