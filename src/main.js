import UserRankView from "./view/user-rank.js";
import MainNavigationView from "./view/main-navigation.js";
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
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
import {render, RenderPosition, remove} from "./utils/render.js";

const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_CARDS_EXTRA_COUNT = 2;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilm);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView().getElement(), RenderPosition.BEFOREEND);

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
      render(filmDetailsComment, new UserCommentView(filmComments[i]), RenderPosition.BEFOREEND);
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

  filmComponent.setShowFilmDetailsClickHandler(showFilmDetails);
  filmDetailsComponent.setHideFilmDetailsClickHandler(hideFilmDetails);

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilmBoard = (boardContainer, boardFilms) => {
  const films = new FilmsView();
  const filmsList = new FilmsListView();
  const filmsListContainer = new FilmsListContainerView();

  if (boardFilms.length > 0) {
    render(boardContainer, new SortView(), RenderPosition.BEFOREEND);
  } else {
    const noFilmComponent = new NoFilmView();
    render(filmsList, noFilmComponent, RenderPosition.BEFOREEND);
  }

  render(boardContainer, films, RenderPosition.BEFOREEND);
  render(films, filmsList, RenderPosition.BEFOREEND);
  render(filmsList, filmsListContainer, RenderPosition.BEFOREEND);

  for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
    renderFilm(filmsListContainer, boardFilms[i]);
  }

  if (boardFilms.length > FILM_COUNT_PER_STEP) {
    let filmStep = FILM_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      boardFilms
          .slice(filmStep, filmStep + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmsListContainer, film));

      filmStep += FILM_COUNT_PER_STEP;

      if (filmStep >= filmCards.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  render(films, new FilmsTopRatedView(), RenderPosition.BEFOREEND);
  render(films, new FilmsMostCommentedView(), RenderPosition.BEFOREEND);

  const filmsListExtra = document.querySelectorAll(`.films-list--extra`);
  const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
  const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_CARDS_EXTRA_COUNT; i++) {
    render(filmsTopRatedContainer, new FilmCardView(filmCards[i]), RenderPosition.BEFOREEND);
    render(filmsMostCommentedContainer, new FilmCardView(filmCards[i]), RenderPosition.BEFOREEND);
  }
};

renderFilmBoard(siteMainElement, filmCards);

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, new FooterStatisticsView(FILM_CARDS_COUNT), RenderPosition.BEFOREEND);
