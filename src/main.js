import {createUserRankTemplate} from "./view/user-rank.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListContainerTemplate} from "./view/film-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/more-button.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details.js";
import {createFilmsTopRatedTemplate} from "./view/top-rated.js";
import {createFilmsMostCommentedTemplate} from "./view/most-commented.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistic.js";
import {createUserCommentTemplate} from "./view/user-comment.js";
import {generateComment} from "./mock/film.js";
import {generateFilm} from "./mock/film.js";

const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_CARDS_EXTRA_COUNT = 2;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilm);
const commentsCount = generateFilm().comments.length;
const filmComments = new Array(commentsCount).fill().map(generateComment);

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserRankTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsListContainerTemplate());

const films = siteMainElement.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  render(filmsListContainer, createFilmCardTemplate(filmCards[i]));
}

if (filmCards.length > FILM_COUNT_PER_STEP) {
  render(filmsList, createShowMoreButtonTemplate());
  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);
  let filmStep = FILM_COUNT_PER_STEP;
  loadMoreButton.addEventListener(`click`, () => {
    if (filmStep < FILM_CARDS_COUNT) {
      for (let i = filmStep; i < FILM_COUNT_PER_STEP + filmStep; i++) {
        render(filmsListContainer, createFilmCardTemplate(filmCards[i]));
      }
      filmStep += FILM_COUNT_PER_STEP;
    } else {
      loadMoreButton.hidden = true;
    }
  });
}

render(films, createFilmsTopRatedTemplate());
render(films, createFilmsMostCommentedTemplate());

const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARDS_EXTRA_COUNT; i++) {
  render(filmsTopRatedContainer, createFilmCardTemplate(filmCards[i]));
  render(filmsMostCommentedContainer, createFilmCardTemplate(filmCards[i]));
}

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, createFooterStatisticsTemplate(FILM_CARDS_COUNT));

const body = document.body;
body.classList.add(`hide-overflow`);
const hideOverflow = document.querySelector(`.hide-overflow`);
render(hideOverflow, createFilmDetailsPopupTemplate(filmCards[0]));

const filmDetailsComment = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < commentsCount; i++) {
  render(filmDetailsComment, createUserCommentTemplate(filmComments[i]));
}
const filmDetails = document.querySelector(`.film-details`);
const filmDetailsClose = document.querySelector(`.film-details__close-btn`);
filmDetailsClose.addEventListener(`click`, () => {
  filmDetails.hidden = true;
  body.classList.remove(`hide-overflow`);
});
