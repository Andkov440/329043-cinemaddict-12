import UserRankView from "./view/user-rank.js";
import MainNavigationView from "./view/main-navigation.js";
import SortView from "./view/sort.js";
import FilmsListContainerView from "./view/film-list.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/more-button.js";
import FilmDetailsPopupView from "./view/film-details.js";
import FilmsTopRatedView from "./view/top-rated.js";
import FilmsMostCommentedView from "./view/most-commented.js";
import NoFilmView from "./view/no-film.js";
import FooterStatisticsView from "./view/footer-statistic.js";
import UserCommentView from "./view/user-comment.js";
import {generateComment} from "./mock/film.js";
import {generateFilm} from "./mock/film.js";
import {render, RenderPosition} from "./utils.js";

const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_CARDS_EXTRA_COUNT = 2;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilm);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView().getElement(), RenderPosition.BEFOREEND);

if (filmCards.length > 0) {
  render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
} else {
  const noFilmComponent = new NoFilmView();
  render(filmsList, noFilmComponent.getElement(), RenderPosition.BEFOREEND);
}

render(siteMainElement, new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND);

const films = siteMainElement.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

const renderFilm = (filmListElement, filmCard) => {
  const commentsCount = filmCard.comments.length;
  const filmComments = new Array(commentsCount).fill().map(generateComment);
  const filmComponent = new FilmCardView(filmCard, commentsCount);
  const filmDetailsComponent = new FilmDetailsPopupView(filmCard, commentsCount);

  const showFilmDetails = () => {
    document.body.classList.add(`hide-overflow`);
    document.querySelector(`.hide-overflow`).appendChild(filmDetailsComponent.getElement());
    const filmDetailsComment = document.querySelector(`.film-details__comments-list`);


    for (let i = 0; i < filmComments.length; i++) {
      render(filmDetailsComment, new UserCommentView(filmComments[i]).getElement(), RenderPosition.BEFOREEND);
    }

    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const hideFilmDetails = () => {
    document.querySelector(`.hide-overflow`).removeChild(filmDetailsComponent.getElement());
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, showFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, showFilmDetails);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, showFilmDetails);
  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, hideFilmDetails);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  renderFilm(filmsListContainer, filmCards[i]);
}

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let filmStep = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
        .slice(filmStep, filmStep + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainer, film));

    filmStep += FILM_COUNT_PER_STEP;

    if (filmStep >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(films, new FilmsTopRatedView().getElement(), RenderPosition.BEFOREEND);
render(films, new FilmsMostCommentedView().getElement(), RenderPosition.BEFOREEND);

const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARDS_EXTRA_COUNT; i++) {
  render(filmsTopRatedContainer, new FilmCardView(filmCards[i]).getElement(), RenderPosition.BEFOREEND);
  render(filmsMostCommentedContainer, new FilmCardView(filmCards[i]).getElement(), RenderPosition.BEFOREEND);
}
const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new FooterStatisticsView(FILM_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);
