import {getRandomInteger} from '../utils.js';

export const createAppFilmStatisticsTemplate = () => {
  const filmsQuantity = getRandomInteger(0, 20000);
  return (
    `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>
  `
  );
};
