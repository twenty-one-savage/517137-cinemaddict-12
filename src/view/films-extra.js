import AbstracView from './absrtact';

export default class FilmsExtraView extends AbstracView {

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
