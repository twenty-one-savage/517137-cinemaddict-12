import AbstractView from "./abstract";

export default class CommentSection extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>
      <ul class="film-details__comments-list">
      </ul>
      </section>`;
  }

  getCommentList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }
}
