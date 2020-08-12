import {getRandomInteger} from '../utils.js';
import {FilmsCount, FilmOptions, genres} from '../consts.js';

const generateFilmName = () => {
  const filmNames = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `The Great Flamarion`,
    `Made for Each Other`,
    `Popeye the Sailor Meets Sindbad the Sailor`
  ];

  const randomIndex = getRandomInteger(0, filmNames.length - 1);

  return filmNames[randomIndex];
};

const generateFilmPoster = () => {
  const filmPosters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  const randomIndex = getRandomInteger(0, filmPosters.length - 1);

  return filmPosters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  let description = descriptions.sort(() => 0.5 - Math.random()).slice(0, 5).join(` `);

  return description;
};

const generateComments = () => {
  return [{
    text: null,
    emoji: null,
    author: null,
    date: null,
    quantity: getRandomInteger(0, 5)
  }];
};

const generateFilmRating = () => {
  return (Math.random() * (FilmOptions.filmRating.MAX)).toFixed(1);
};

const generateFilmYearOfProduction = () => {
  return getRandomInteger(FilmOptions.filmYear.MIN, FilmOptions.filmYear.MAX);
};

const generateFilmDuration = () => {
  const filmDuration = {
    hours: getRandomInteger(FilmOptions.filmDuration.hours.MIN, FilmOptions.filmDuration.hours.MAX),
    minutes: getRandomInteger(FilmOptions.filmDuration.minutes.MIN, FilmOptions.filmDuration.minutes.MAX)
  };

  return filmDuration;
};

const genereateFilmGenre = () => {
  const randomIndex = getRandomInteger(0, genres.length - 1);
  return genres[randomIndex];
};

const generateFilm = () => {
  const comment = generateComments();

  return {
    poster: generateFilmPoster(),
    name: generateFilmName(),
    rating: generateFilmRating(),
    yearOfProduction: generateFilmYearOfProduction(),
    duration: generateFilmDuration(),
    genre: genereateFilmGenre(),
    description: generateDescription(),
    commentsQuantity: comment[0].quantity,
    isWatchlist: Boolean(getRandomInteger()),
    isHistory: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger())
  };
};

export const generateFilms = () => {
  return new Array(FilmsCount.MAIN).fill().map(generateFilm);
};
