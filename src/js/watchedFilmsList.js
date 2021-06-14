import watchedFilmsCard from '../templates/watchedFilmsCard.hbs';
import { listFilmsRef, watchedFilmList } from './common/refs';
import { openModal } from './modal';

listFilmsRef.addEventListener('click', createWatchedFilmList);
window.addEventListener('DOMContentLoaded', renderWatchedFilmsList);

function createWatchedFilmList(e) {
  let watchedMovieList = JSON.parse(localStorage.getItem('watchedFilms')) || [];
  let watchedMovieData = {};
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  watchedMovieData.id = e.target.dataset.movieId;
  watchedMovieData.src = e.target.dataset.src;
  watchedMovieData.title = e.target.alt;
  if (watchedMovieList && watchedMovieList.some(film => film.id === watchedMovieData.id)) {
    return;
  }
  if (watchedMovieList && watchedMovieList.length === 5) {
    watchedMovieList.pop();
  }
  watchedMovieList.unshift(watchedMovieData);
  localStorage.setItem('watchedFilms', JSON.stringify(watchedMovieList));
  renderWatchedFilmsList(watchedMovieList);
}

function renderWatchedFilmsList() {
  const watchedFilmsInLS = JSON.parse(localStorage.getItem('watchedFilms'));
  const markupWatchedFilms = watchedFilmsCard(watchedFilmsInLS);
  watchedFilmList.innerHTML = markupWatchedFilms;
}

watchedFilmList.addEventListener('click', openModal);
