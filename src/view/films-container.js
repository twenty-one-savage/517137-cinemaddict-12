import AbstractView from './absrtact';

export default class FilmsContainerView extends AbstractView {

  getTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
