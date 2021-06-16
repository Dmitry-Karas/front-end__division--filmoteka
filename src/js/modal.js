import modalCard from '../templates/modal.hbs';
import { clearMarkup, renderMarkup } from './common/functions';
import NewFetchApiFilms from './apiService';
import { backdrop, listFilmsRef } from './common/refs';
import { getCurrentUser, getUserLibraryFromLocalStorage, checkFilm } from './localStorage';
import { addSpinnerForModalWindow } from './common/spinner';
import trailerTmp from '../templates/trailer.hbs';

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

    cardTitle.addEventListener('click', addTrailerToModal);

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

async function addTrailerToModal(e) {
  const aboutRef = document.querySelector('.card-about-desc');
  const trailerRef = document.querySelector('.card-about-trailer');
  const cardDescRef = document.querySelector('.card-description');
  const cardTrailerRef = document.querySelector('.card-trailer');

  if (e.target.classList.contains('card-about-desc')) {
    aboutRef.classList.add('active');
    trailerRef.classList.remove('active');

    clearMarkup(cardTrailerRef);
    cardDescRef.classList.remove('visually-hidden');
  }
  if (e.target.classList.contains('card-about-trailer')) {
    cardDescRef.classList.add('visually-hidden');
    aboutRef.classList.remove('active');
    trailerRef.classList.add('active');

    const id = e.target.getAttribute('data-movie-id');
    const trailer = await newFetchApiFilms.fetchTrailerById(id).then(res => res.data.results);

    if (trailer.length > 0) {
      renderMarkup(cardTrailerRef, trailerTmp(trailer));

      const parent = document.querySelector('.carousel-inner');
      parent.firstElementChild.classList.add('active');

      stopSliderModal();
    }
    if (trailer.length === 1) {
      const controllerPrev = document.querySelector('.carousel-control-prev');
      const controllerNext = document.querySelector('.carousel-control-next');
      controllerPrev.classList.add('visually-hidden');
      controllerNext.classList.add('visually-hidden');
    }
    if (trailer.length === 0) {
      renderMarkup(
        cardTrailerRef,
        `<img src="https://images.squarespace-cdn.com/content/v1/5384dff5e4b0f0364dee7a5e/1548952305143-LBRXYGNCV4IY7GM8BAIZ/ke17ZwdGBToddI8pDm48kKlnEJe-S6O_EkCaG3agFGRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIoZZj1IxCyoFOvqhbL3p5Vd7WCUv4osST93yOtHyFrwEKMshLAGzx4R3EDFOm1kBS/trailer+coming+soon.jpg" alt="No trailer" class="card-trailer-cover">`,
      );
    }
  }
}

function stopSliderModal() {
  const myCarousel = document.querySelector('#carouselExampleControls');
  const carousel = new bootstrap.Carousel(myCarousel, {
    pause: true,
  });
}

// async function openModalTrailer(e) {
//   try {
//     if (e.target.classList.contains('movie__button-youtube')) {
//       const id = e.target.getAttribute('data-movie-id');
//       const trailer = await newFetchApiFilms.fetchTrailerById(id).then(res => res.data.results); //делает запрос

//       console.log('trailer', trailer.length);

//       const backdrop = document.querySelector('.trailer__overlay');

//       if (trailer.length > 0) {
//         backdrop.classList.remove('is-hidden');
//         renderMarkup(trailerModalRef, trailerFilmTmp(trailer));

//         stopSliderModal();
//         const parent = document.querySelector('.carousel-inner');
//         parent.firstElementChild.classList.add('active');
//       }
//       if (trailer.length === 1) {
//         const controllerPrev = document.querySelector('.carousel-control-prev');
//         const controllerNext = document.querySelector('.carousel-control-next');
//         controllerPrev.classList.add('visually-hidden');
//         controllerNext.classList.add('visually-hidden');
//       }
//
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// //

// function onOverlayClick(e) {
//   if (e.target === e.currentTarget) {
//     closeModal();
//   }
// }

// function onPressEscKey(e) {
//   const ESC_KEY_CODE = 'Escape';

//   if (e.code === ESC_KEY_CODE) {
//     closeModal();
//   }
// }

// function closeModal() {
//   trailerBackdropRef.classList.add('is-hidden');
//   clearMarkup(trailerModalRef);
// }

// function stopSliderModal() {
//   const myCarousel = document.querySelector('#carouselExampleControls');
//   const carousel = new bootstrap.Carousel(myCarousel, {
//     pause: true,
//   });
// }
