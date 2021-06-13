import modalCard from '../templates/modal.hbs';
import { clearMarkup, renderMarkup } from './common/functions';
import NewFetchApiFilms from './apiService';
import { openedModal, modal, body, backdrop } from './common/refs';
import { getCurrentUser, getUserLibraryFromLocalStorage, checkFilm } from './localStorage';

const newFetchApiFilms = new NewFetchApiFilms();
const user = getCurrentUser();

openedModal.addEventListener('click', openModal);
backdrop.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onPressEscKey);

async function openModal(e) {
  try {
    const movieId = e.target.dataset.movieId;

    if (e.target.nodeName !== 'IMG') {
      return;
    }

    backdrop.classList.remove('is-hidden');
    body.classList.add('scroll-hidden');

    const film = await newFetchApiFilms
      .fetchMovieById(movieId)
      .then(film => film.data)
      .catch(error => {
        console.log(error);
      });

    renderModalCard(film);
    clickIconClose();

    if (!user) {
      return;
    }

    const watchedBtn = document.querySelector('.button-modal');
    const queueBtn = document.querySelector('.button-queue');
    const { watched, queue } = getUserLibraryFromLocalStorage();
    const watchedFilm = checkFilm(watched, movieId);
    const queueFilm = checkFilm(queue, movieId);

    watchedFilm ? (watchedBtn.textContent = 'remove') : (watchedBtn.textContent = 'add to watched');
    queueFilm ? (queueBtn.textContent = 'remove') : (queueBtn.textContent = 'add to queue');
  } catch (error) {
    console.log(error);
  }
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function onPressEscKey(e) {
  const ESC_KEY_CODE = 'Escape';

  if (e.code === ESC_KEY_CODE) {
    closeModal();
  }
}

function clickIconClose() {
  const closeBtn = document.querySelector('.cl-btn');
  closeBtn.addEventListener('click', closeModal);
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  body.classList.remove('scroll-hidden');
  clearMarkup(backdrop);
}

function renderModalCard(film) {
  const markup = modalCard(film);

  renderMarkup(backdrop, markup);
}
