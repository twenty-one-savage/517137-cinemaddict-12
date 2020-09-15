import AbstractView from './absrtact';

const createFilterItemTemplate = (filter, currentFilterType) => {
  let {type, name, count} = filter;

  const isCounted = () => {
    return count ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  };

  return (
    `
    <a href="#${name.toLowerCase().replace(/\s+/g, ``)}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter="${type}">
    ${name}
    ${isCounted()}
    </a>
    `
  );
};

const createAppMainNavigationTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class MainNavigationView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createAppMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
