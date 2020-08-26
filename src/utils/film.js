export const sortFilmDate = (firstFilm, secondFilm) => {
  return firstFilm.yearOfProduction - secondFilm.yearOfProduction;
};

export const sortFilmRating = (firstFilm, secondFilm) => {
  return firstFilm.rating - secondFilm.rating;
};
