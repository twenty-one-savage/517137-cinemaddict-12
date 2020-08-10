const createFilterItemTemplate = (filter) => {
  let {name, count} = filter;

  const pasteRightName = (filterName) => {

    const filterNameMap = {
      watchList: `Watch List`,
      history: `History`,
      favorites: `Favorites`
    };

    switch (name) {
      case `watchList`:
        filterName = filterNameMap.watchList;
        break;
      case `history`:
        filterName = filterNameMap.history;
        break;
      case `favorites`:
        filterName = filterNameMap.favorites;
        break;
      default:
        break;
    }

    return filterName;

  };


  return (
    `
    <a href="#${name.toLowerCase()}" class="main-navigation__item">${pasteRightName(name)} <span class="main-navigation__item-count">${count}</span></a>
    `
  );
};

export const createAppMainNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join(``);
  return (
    `
    <nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    `
  );
};
