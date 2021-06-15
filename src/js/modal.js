import modalCard from '../templates/modal.hbs';
import { clearMarkup, renderMarkup } from './common/functions';
import NewFetchApiFilms from './apiService';
import { backdrop, listFilmsRef } from './common/refs';
import { getCurrentUser, getUserLibraryFromLocalStorage, checkFilm } from './localStorage';
import { addSpinnerForModalWindow } from './common/spinner';
import trailerTmp from '../templates/trailer.hbs';
// import { async } from 'fast-glob';

const newFetchApiFilms = new NewFetchApiFilms();

listFilmsRef.addEventListener('click', openModal);
backdrop.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onPressEscKey);

export async function openModal(e) {
  try {
    const movieId = e.target.dataset.movieId;
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    backdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open');

    const film = await newFetchApiFilms
      .fetchMovieById(movieId)
      .then(film => film.data)
      .catch(error => {
        console.log(error);
      });

    renderModalCard(film);
    clickIconClose();

    const watchedBtn = document.querySelector('.button-modal');
    const queueBtn = document.querySelector('.button-queue');
    const { watched, queue } = getUserLibraryFromLocalStorage();
    const watchedFilm = checkFilm(watched, movieId);
    const queueFilm = checkFilm(queue, movieId);
    const user = getCurrentUser();

    const cardTitle = document.querySelector('.card-about-title');
    // const
    cardTitle.addEventListener('click', deth);

    if (!user) {
      return;
    }

    watchedFilm
      ? (watchedBtn.textContent = 'remove from watched')
      : (watchedBtn.textContent = 'add to watched');
    queueFilm
      ? (queueBtn.textContent = 'remove from queue')
      : (queueBtn.textContent = 'add to queue');
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
  document.body.classList.remove('modal-open');
  clearMarkup(backdrop);
}

function renderModalCard(film) {
  const markup = modalCard(film);

  renderMarkup(backdrop, markup);
  addSpinnerForModalWindow();
}

async function deth(e) {
  if (e.target.classList.contains('card-about-desc')) {
  }
  if (e.target.classList.contains('card-about-trailer')) {
    const markup = document.querySelector('.more');
    clearMarkup(markup);

    const id = e.target.getAttribute('data-movie-id');
    const trailer = await newFetchApiFilms.fetchTrailerById(id).then(res => res.data.results);

    if (trailer.length > 0) {
      renderMarkup(markup, trailerTmp(trailer));

      stopSliderModal();
    }
  }
}

function stopSliderModal() {
  const myCarousel = document.querySelector('#carouselExampleControls');
  const carousel = new bootstrap.Carousel(myCarousel, {
    pause: true,
  });
}

//делает запрос

// if (trailer.length === 1) {
//   const controllerPrev = document.querySelector('.carousel-control-prev');
//   const controllerNext = document.querySelector('.carousel-control-next');
//   controllerPrev.classList.add('visually-hidden');
//   controllerNext.classList.add('visually-hidden');
// }
// if (trailer.length === 0) {
//   const lol = document.querySelector('movie__button-youtube');
//   console.log('lol', lol);
//   backdrop.classList.remove('is-hidden');
//   renderMarkup(trailerModalRef, trailerFilmTmp(trailer));
// }
// }
// } catch (error) {
// console.log(error);
// }
