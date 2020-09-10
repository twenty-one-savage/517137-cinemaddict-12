import UserView from './view/user';
import MainNavigationView from './view/main-nav';
import FilmsStatisticsView from './view/film-statistics';
import MovieList from './presenter/movie-list';
import FilmsModel from './model/films';
import {generateFilms} from './mock/film';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from "./utils/render";

const allFilms = generateFilms();

const filters = generateFilter(allFilms);

const filmsModel = new FilmsModel();
filmsModel.setFilms(allFilms);

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView(), RenderPosition.BEFOREEND);

render(appMainElement, new MainNavigationView(filters), RenderPosition.AFTERBEGIN);

const filmsContainerPresenter = new MovieList(appMainElement, filmsModel);
filmsContainerPresenter.init(allFilms);

render(appFooterElement, new FilmsStatisticsView(), RenderPosition.BEFOREEND);
