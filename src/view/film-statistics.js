import AbstractView from './absrtact';
import {getRandomInteger} from '../utils/common';
import {FilmsCount} from '../consts';


export default class FilmsStatisticsView extends AbstractView {

  getTemplate() {
    const filmsQuantity = getRandomInteger(0, FilmsCount.ALL_FILMS);
    return `<section class="footer__statistics">
      <p>${filmsQuantity} movies inside</p>
    </section>`;
  }
}
