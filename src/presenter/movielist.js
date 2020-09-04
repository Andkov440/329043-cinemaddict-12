import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/more-button.js";
import FilmDetailsPopupView from "./view/film-details.js";
import NoFilmView from "./view/no-film.js";
import {render, RenderPosition, remove} from "./utils/render.js";

export default class MovieList {
  constructor(boardContainer) {
    this._FilmsListContainer = FilmsListContainer;

    this._FilmsComponent = new FilmsView();
    this._FilmsListComponent = new FilmsListView();
    this._FilmsListContainerComponent = new FilmsListContainerView();
    this._noFilmComponent = new NoFilmView();
    this._FilmDetailsPopupComponent = new FilmDetailsPopupView();
  }


}
