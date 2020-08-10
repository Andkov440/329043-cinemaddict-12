const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = (arr, min = 0, max = 1) => {
  let result = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    result.push(arr[getRandomInteger(0, arr.length - 1)]);
  }

  return result;
};

const formatDate = (date) => {

  let dd = date.getDate();
  if (dd < 10) {
    dd = `0` + dd;
  }

  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = `0` + mm;
  }

  let yy = date.getFullYear() % 100;
  if (yy < 10) {
    yy = `0` + yy;
  }

  let hh = date.getHours();
  if (hh < 10) {
    hh = `0` + hh;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  return `${dd}/${mm}/${yy} ${hh}:${minutes}`;
};

const generateCaption = () => {
  const captions = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`
  ];

  const randomIndex = getRandomInteger(0, captions.length - 1);

  return captions[randomIndex];
};

const generatePoster = () => {
  const path = `/images/posters/`;
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return `${path}${posters[randomIndex]}`;
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras aliquet varius magna, non porta ligula feugiat eget.
                Fusce tristique felis at fermentum pharetra.
                Aliquam id orci ut lectus varius viverra.
                Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
                Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
                Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
                Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
                Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const textArray = text.split(`.`);

  return getRandomArray(textArray, 1, 5);
};

const generateEmoji = () => {
  const path = `/images/emoji/`;
  const emojies = [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ];

  const randomIndex = getRandomInteger(0, emojies.length - 1);

  return `${path}${emojies[randomIndex]}`;
};

const generateDate = () => {
  let now = new Date();

  return formatDate(now);
};

const generateAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Doe John`,
    `Macoveev Tim`
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateMessage = () => {
  const messages = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  const randomIndex = getRandomInteger(0, messages.length - 1);

  return messages[randomIndex];
};

const generateRating = () => {
  const ratings = [
    `8.3`,
    `7`,
    `9`,
    `5.5`
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
};

const generateYear = () => {
  const years = [
    `1929`,
    `1930`,
    `1931`,
    `1932`
  ];

  const randomIndex = getRandomInteger(0, years.length - 1);

  return years[randomIndex];
};

const generateDuration = () => {
  const durations = [
    `1h 36m`,
    `2h 05m`,
    `1h 30m`,
    `3h 10m`
  ];

  const randomIndex = getRandomInteger(0, durations.length - 1);

  return durations[randomIndex];
};

const generateGenre = () => {
  const genres = [
    `Western`,
    `Musical`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateComment = () => {
  return {
    emoji: generateEmoji(),
    dateComment: generateDate(),
    author: generateAuthor(),
    message: generateMessage()
  };
};

const generateCommentsArray = () => {
  let result = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    result.push(generateComment());
  }
  return result;
};

export const generateFilm = () => {
  return {
    caption: generateCaption(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateCommentsArray(),
    rating: generateRating(),
    year: generateYear(),
    duration: generateDuration(),
    genre: generateGenre(),
    commentsCount: generateCommentsArray().length
  };
};
