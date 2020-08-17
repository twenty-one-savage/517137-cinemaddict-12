<<<<<<< HEAD
import AbstracView from './absrtact';

export default class FilmsExtraView extends AbstracView {
=======
import {createElement} from '../utils';
>>>>>>> 10b5852... 4.2.1 исправил не все замечания наставника

  constructor(category) {
    super();
    this._category = category;
  }

  getTemplate() {
    return `<section class="films-list--extra">
        <h2 class="films-list__title">${this._category}</h2>
        <div class="films-list__container"></div>
      </section>`;
  }

}
