const filmToFilterMap = {
  'Watch List': (films) => films.filter((film) => film.isWatchlist).length,
  'History': (films) => films.filter((film) => film.isHistory).length,
  'Favorites': (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films)
    };
  });
};
