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
import {generateFilm} from "./mock/film.js";

const FILM_CARDS_COUNT = 20;
const FILM_CARDS_EXTRA_COUNT = 2;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilm);

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

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

render(filmsList, createShowMoreButtonTemplate());

render(films, createFilmsTopRatedTemplate());
render(films, createFilmsMostCommentedTemplate());

const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const filmsTopRatedContainer = filmsListExtra[0].querySelector(`.films-list__container`);
const filmsMostCommentedContainer = filmsListExtra[1].querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARDS_EXTRA_COUNT; i++) {
  render(filmsTopRatedContainer, createFilmCardTemplate());
  render(filmsMostCommentedContainer, createFilmCardTemplate());
}

const footerStatistic = document.querySelector(`.footer__statistics`);
render(footerStatistic, createFooterStatisticsTemplate());

const body = document.body;
body.classList.add(`hide-overflow`);
const hideOverflow = document.querySelector(`.hide-overflow`);
render(hideOverflow, createFilmDetailsPopupTemplate());
