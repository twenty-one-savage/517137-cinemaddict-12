import AbstractView from '../view/absrtact';

export default class BtnShowMoreView extends AbstractView {
  constructor() {
    super();

    this._btnClickHandler = this._btnClickHandler.bind(this);
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setBtnClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._btnClickHandler);
  }
}
