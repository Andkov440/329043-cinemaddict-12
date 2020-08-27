import {createElement} from "../utils.js";

const createUserCommentTemplate = (filmComment) => {
  const {emoji, dateComment, author, message} = filmComment;
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emoji}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${dateComment}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  );
};

export default class UserComment {
  constructor(filmComment) {
    this._filmComment = filmComment;
    this._element = null;
  }

  getTemplate() {
    return createUserCommentTemplate(this._filmComment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
