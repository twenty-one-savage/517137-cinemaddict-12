import AbstractView from './absrtact';
import {SortType} from '../consts';

export default class SortViewv extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`;
  }


  setSortTypeChangeHandler(callback) {
    this._callback = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (!evt.target.classList.contains(`sort__button`)) {
      return;
    }

    evt.preventDefault();
    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

    evt.target.classList.add(`sort__button--active`);
    this._callback(evt.target.dataset.sortType);
  }
}
