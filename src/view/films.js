import AbstractView from './absrtact';

export default class FilmsView extends AbstractView {

  getTemplate() {
    return `<section class="films"></section>`;
  }
}
