import AbstractView from '../view/absrtact';

export default class BtnShowMoreView extends AbstractView {

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
