
import AbstractView from './absrtact.js';

export default class NoFilmsView extends AbstractView {

  getTemplate() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}
