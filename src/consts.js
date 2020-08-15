import { getRandomInteger } from "./utils";

export const NUMBER_OF_CATEGORIES = 2;

export const FilmsCount = {
  MAIN: 8,
  EXTRA: 2,
  PER_STEP: 5,
  ALL_FILMS: 20000
};

export const FilmOptions = {
  filmRating: {
    MIN: 0,
    MAX: 10
  },
  filmYear: {
    MIN: 1900,
    MAX: 2020
  },
  filmDuration: {
    hours: {
      MIN: 0,
      MAX: 3
    },
    minutes: {
      MIN: 0,
      MAX: 60
    }
  }
};

export const GENRES = [`Musical`, `Western`, ` Drama`, `Comedy`, `Cartoon`, `Mystery`];

export const CATEGORIES = [`Top Rated`, `Most Commented`];

export const generateDate = () => {

  const formatDate = () => {

    const addZeroToNumberLessThanTen = (number) => {
      const updateNumber = number < 10 ? number = `0` + number : number;
      return updateNumber;
    };

    let year = getRandomInteger(1970, 2020);
    let month = getRandomInteger(1, 12);
    let day = getRandomInteger(1, 12);
    let hour = getRandomInteger(0, 23);
    let minutes = getRandomInteger(0, 59);

    let arrOfDate = [year, month, day].map((el) => addZeroToNumberLessThanTen(el)).join(`/`);
    let arrOfTime = [hour, minutes].map((el) => addZeroToNumberLessThanTen(el)).join(`:`);
    return `${arrOfDate} ${arrOfTime}`;
  };

  return formatDate();
};
