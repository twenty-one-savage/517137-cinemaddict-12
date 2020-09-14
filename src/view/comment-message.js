import AbstractView from "./abstract";

export default class CommentMessage extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._clickHandler = this._clickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    const {text, emoji, author, date} = this._comment;
    return `<li class="film-details__comment" data-date="${date}">
     <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
     </span>
     <div>
       <p class="film-details__comment-text">${text}</p>
       <p class="film-details__comment-info">
         <span class="film-details__comment-author">${author}</span>
         <span class="film-details__comment-day">${date}</span>
         <button class="film-details__comment-delete">Delete</button>
       </p>
     </div>
   </li>`;
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    this._comment.delete = true;
    callback();
  }

  _deleteClickHandler(evt) {
    this._clickHandler(evt, this._callback.deleteClick);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }

}
