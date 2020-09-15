import UserView from './view/user';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import FilmsStatisticsView from './view/film-statistics';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import {generateFilms} from './mock/film';
import {render, RenderPosition} from "./utils/render";

const allFilms = generateFilms();

const filmsModel = new FilmsModel();
filmsModel.setFilms(allFilms);

const filterModel = new FilterModel();

const appBodyElement = document.querySelector(`body`);
const appHeaderElement = appBodyElement.querySelector(`.header`);
const appMainElement = appBodyElement.querySelector(`.main`);
const appFooterElement = appBodyElement.querySelector(`.footer`);

render(appHeaderElement, new UserView(), RenderPosition.BEFOREEND);

const filmsPresenter = new MovieListPresenter(appMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(appMainElement, filterModel, filmsModel);
filterPresenter.init();
filmsPresenter.init();


render(appFooterElement, new FilmsStatisticsView(), RenderPosition.BEFOREEND);
