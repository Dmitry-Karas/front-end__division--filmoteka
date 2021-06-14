import modalCard from '../templates/modal.hbs';
import { clearMarkup, renderMarkup } from './common/functions';
import NewFetchApiFilms from './apiService';
import { openedModal, modal, body, backdrop } from './common/refs';

const newFetchApiFilms = new NewFetchApiFilms();

openedModal.addEventListener('click', openModal);
backdrop.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onPressEscKey);

export async function openModal(e) {
  try {
    const movieId = e.target.dataset.movieId;
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    backdrop.classList.remove('is-hidden');
    body.classList.add('body');

    const film = await newFetchApiFilms
      .fetchMovieById(movieId)
      .then(film => film.data)
      .catch(error => {
        console.log(error);
      });
    renderModalCard(film);
    clickIconClose();
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

function closeModal(e) {
  backdrop.classList.add('is-hidden');
  body.classList.remove('body');
  clearMarkup(backdrop);
}

function renderModalCard(film) {
  const markup = modalCard(film);
  renderMarkup(backdrop, markup);
}
