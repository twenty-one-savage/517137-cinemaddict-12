import momentRandom from 'moment-random';
import {nanoid} from 'nanoid';

import {getRandomInteger} from '../utils/common';
import {FilmsCount, FilmOptions, GENRES} from '../consts';

const generateDate = () => {
  return momentRandom().fromNow();
};

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

  const CommentsMap = {
    TEXT: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`],
    EMOJI: [`angry`, `puke`, `sleeping`, `smile`],
    AUTHOR: [`Tim Macoveev`, `John Doe`],
  };

  const comments = [];

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    comments.push({
      text: CommentsMap.TEXT[getRandomInteger(0, CommentsMap.TEXT.length - 1)],
      emoji: CommentsMap.EMOJI[getRandomInteger(0, CommentsMap.EMOJI.length - 1)],
      author: CommentsMap.AUTHOR[getRandomInteger(0, CommentsMap.AUTHOR.length - 1)],
      date: generateDate()
    });
  }
  return comments;
};

const generateFilmRating = () => {
  return (Math.random() * (FilmOptions.filmRating.MAX)).toFixed(1);
};

const generateFilmYearOfProduction = () => {
  return momentRandom().format(`YYYY`);
};

const generateFilmDuration = () => {
  const filmDuration = {
    hours: momentRandom().format(`h`),
    minutes: momentRandom().format(`mm`),
  };

  return filmDuration;
};

const genereateFilmGenre = () => {


  return GENRES
  .sort(() => 0.5 - Math.random())
  .slice(getRandomInteger(0, GENRES.length - 1));
};

const generateFilm = () => {
  const comments = generateComments();
  return {
    id: nanoid(),
    poster: generateFilmPoster(),
    name: generateFilmName(),
    rating: generateFilmRating(),
    yearOfProduction: generateFilmYearOfProduction(),
    duration: generateFilmDuration(),
    genres: genereateFilmGenre(),
    description: generateDescription(),
    commentsQuantity: comments.length,
    comments,
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export const generateFilms = () => {
  return new Array(FilmsCount.MAIN).fill().map(generateFilm);
};
