import SmartView from './smart';
import {renderTemplate, RenderPosition} from '../utils/render';
export default class FilmPopupView extends SmartView {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;

    this._filmPopupControlsClickHandler = this._filmPopupControlsClickHandler.bind(this);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._emojiesToggleHandler = this._emojiesToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {

    const createCommentsItem = (item) => {
      return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${item.emoji}.png" data-emoji="${item.emoji}" width="55" height="55" alt="emoji-${item.emoji}">
            </span>
            <div>
              <p class="film-details__comment-text">${item.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${item.author}</span>
                <span class="film-details__comment-day">${item.date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    };

    const fillCommentsList = (comments) => {

      let commentsList = ``;

      for (let comment of comments) {
        commentsList = commentsList.concat(createCommentsItem(comment));
      }

      return commentsList;
    };

    const createCommentsTemplate = (comments) => {

      return `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${fillCommentsList(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" data-emoji="smile" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" data-emoji="sleeping" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" data-emoji="puke" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" data-emoji="angry" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>`;
    };


    const {
      poster,
      name,
      rating,
      yearOfProduction,
      duration,
      genres,
      comments,
      description,
      isWatchlist,
      isWatched,
      isFavorite
    } = this._film;

    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${name}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">30 March ${yearOfProduction}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration.hours}h ${duration.minutes}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genres.join(` `)}</span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      ${createCommentsTemplate(comments)}
    </form>
  </section>`;
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeBtnClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFilmPopupControlsHandler(callback) {
    this._callback.filmPopupControlsClick = callback;
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, this._filmPopupControlsClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this._activateEmojiesToggle();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._film);
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeBtnClick();
  }

  _filmPopupControlsClickHandler(evt) {
    let target = evt.target;

    const watchList = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    const watched = this.getElement().querySelector(`.film-details__control-label--watched`);
    const favorite = this.getElement().querySelector(`.film-details__control-label--favorite`);

    if (target === watchList || target === watched || target === favorite) {

      switch (target) {
        case watchList:
          this._callback.filmPopupControlsClick(`isWatchlist`);
          break;
        case watched:
          this._callback.filmPopupControlsClick(`isWatched`);
          break;
        case favorite:
          this._callback.filmPopupControlsClick(`isFavorite`);
          break;
      }
    }
  }

  _activateEmojiesToggle() {
    this.getElement()
    .querySelectorAll(`.film-details__emoji-label img`)
    .forEach((el) => el.addEventListener(`click`, this._emojiesToggleHandler));
  }

  _emojiesToggleHandler(evt) {
    const element = this.getElement();
    let currentEmoji = evt.target.dataset.emoji;
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const emojiTemplate = (emoji) => {
      return (`
        <img src="./images/emoji/${emoji}.png" alt="emoji-${emoji}" width="55" height="55">
      `);
    };

    if (emojiContainer.firstElementChild) {
      emojiContainer.firstElementChild.remove();
    }

    renderTemplate(emojiContainer, emojiTemplate(currentEmoji), RenderPosition.BEFOREEND);

    element.querySelectorAll(`.film-details__emoji-item`).forEach((el) => el.removeAttribute(`checked`));
    element.querySelector(`#emoji-${currentEmoji}`).setAttribute(`checked`, ``);
  }
}
