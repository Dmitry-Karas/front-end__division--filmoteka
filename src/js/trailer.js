// import NewFetchApiFilms from './apiService';
// import trailerFilmTmp from '../templates/trailer.hbs';
// import { renderMarkup, clearMarkup } from './common/functions';
// import { listFilmsRef, trailerModalRef, trailerBackdropRef } from './common/refs';

// const newFetchApiFilms = new NewFetchApiFilms();

// listFilmsRef.addEventListener('click', openModalTrailer);

// window.addEventListener('keydown', onPressEscKey);

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
//       if (trailer.length === 0) {
//         const lol = document.querySelector('movie__button-youtube');
//         console.log('lol', lol);
//         backdrop.classList.remove('is-hidden');
//         renderMarkup(trailerModalRef, trailerFilmTmp(trailer));
//       }
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
