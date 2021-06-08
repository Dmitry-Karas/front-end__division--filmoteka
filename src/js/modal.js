
import modalCard from '../templates/modal.hbs';
import { clearMarkup, renderMarkup } from './common/functions';
// import { API_KEY, BASE_URL_MODAL } from './common/constants';
import { openedModal, modal, body, backdrop } from './common/refs';

openedModal.addEventListener('click', openModal);
backdrop.addEventListener('click', onOverlayClick);

// const closeBtn = document.querySelector('[data-action="close-btn"]');
// closeBtn.addEventListener('clisk', closeModal);
const BASE_URL = 'https://api.themoviedb.org/3/movie';

function fetchMovie(id) {
  const url = `${BASE_URL}/${id}?api_key=e46b87edbe0418b9678f5579382a8e13&language=en-US`;
  return fetch(url)
    .then(list => list.json())
    .catch(error => {
      console.log(error);
    });
}

// function fetchMovie(id) {
//   const URL = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
//   return fetch(URL)
//     .then(list => list.json())
//     .catch(error => {
//       console.log(error);
//     });
// }

function openModal(e) {
  const movieId = e.target.dataset.src;
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.remove('is-hidden');
  body.classList.add('body');
  fetchMovie(movieId)
    .then(renderModalCard)
    .catch(error => {
      console.log(error);
    });

  window.addEventListener('keydown', closeModal);
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget || onOverlaykey(e)) {
    closeModal();
  }
  window.addEventListener('keydown', onOverlaykey);
}

function onOverlaykey(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;
}

function closeModal() {
  modal.classList.add('is-hidden');
  body.classList.remove('body');
  clearMarkup(backdrop);
}

function renderModalCard(data) {
  const markup = modalCard(data);
  renderMarkup(backdrop, markup);
}
