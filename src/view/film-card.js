import {createElement} from "../utils.js";

const createFilmCardTemplate = (film, commentsCount) => {
  const {caption, poster, description, rating, releaseDate, runtime, genre} = film;
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${caption}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class FilmCard {
  constructor(film, commentsCount) {
    this._film = film;
    this._commentsCount = commentsCount;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._commentsCount);
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
