import NewFetchApiFilms from './apiService';
import filmsGalleryTmp from '../templates/movieСatalog.hbs';
import { renderMarkup, clearMarkup } from './common/functions';
import { listFilmsRef, searchErrRef } from './common/refs';
import debounce from 'lodash.debounce';

const newFetchApiFilms = new NewFetchApiFilms();

export default function listenInput() {
  const inputRef = document.querySelector('.search-form__input');

  inputRef.addEventListener('input', debounce(searchNewFilm, 1000));
  showPopularFilms();
}

export async function showPopularFilms(e) {
  try {
    const films = await newFetchApiFilms
      .fetchApiPopularFilms()
      .then(response => response.data.results);

    addGenreToFilm(films);
  } catch (error) {
    console.log(error);
  }
}

async function searchNewFilm(e) {
  try {
    searchErrRef.classList.add('visually-hidden');

    if (e.target.value === '') {
      clearMarkup(listFilmsRef);
      showPopularFilms();
    } else {
      newFetchApiFilms.query = e.target.value;

      const films = await newFetchApiFilms.fetchApiFilms().then(response => response.data.results);

      if (!films.length) {
        searchErrRef.classList.remove('visually-hidden');
      }

      clearMarkup(listFilmsRef);
      addGenreToFilm(films);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addGenreToFilm(films) {
  const genres = await newFetchApiFilms.fetchGenreList().then(response => response.data.genres);

  const filmsWithGenre = films.map(film => {
    const genreArray = film.genre_ids
      .map(id => {
        return genres.find(genre => genre.id == id).name;
      })
      .join(', ');
    return { ...film, genre: genreArray, release_date: Number.parseInt(film.release_date) };
  });

  renderMarkup(listFilmsRef, filmsGalleryTmp(filmsWithGenre));
}
