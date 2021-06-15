import NewFetchApiFilms from './apiService';
import { renderMarkup, clearMarkup } from './common/functions';
import movieCatalogLibraryTpl from '../templates/movieCatalogLibrary.hbs';
import { listFilmsRef, libraryButtonRef, homeButtonRef } from './common/refs';
import { Database } from './firebase';
import { Notify } from './sweetAlert';
// !!!!дальше не отменять

const libraryRef = document.querySelector('.js-dynamic-container');
const newFetchApiFilm = new NewFetchApiFilms();
const backdrop = document.querySelector('.backdrop');

backdrop.addEventListener('click', onModalWindow);

class Lib {
  constructor(film) {
    this._film = film;
    film.onclick = this.onClick.bind(this); // (*)
  }

  watched() {
    clearMarkup(listFilmsRef);
    const { watched } = getUserLibraryFromLocalStorage();
    renderMarkup(listFilmsRef, movieCatalogLibraryTpl(watched));
  }

  queue() {
    clearMarkup(listFilmsRef);
    const { queue } = getUserLibraryFromLocalStorage();
    renderMarkup(listFilmsRef, movieCatalogLibraryTpl(queue));
  }

  onClick(event) {
    const watchLibBtn = document.querySelector('[data-action="watched"]');
    const queueLibBtn = document.querySelector('[data-action="queue"]');

    const action = event.target.dataset.action;

    if (event.target.nodeName !== 'BUTTON') {
      return;
    }

    event.target.classList.add('button--active');

    // switch refactoring
    switch (event.target) {
      case watchLibBtn:
        event.target.classList.add('button--active');
        queueLibBtn.classList.remove('button--active');
        break;

      case queueLibBtn:
        event.target.classList.add('button--active');
        watchLibBtn.classList.remove('button--active');
        break;
    }

    if (action) {
      this[action]();
    }
  }
}

new Lib(libraryRef);

async function onModalWindow(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  try {
    const modalContainer = document.querySelector('.modal-window');
    const movieId = modalContainer.dataset.id;
    const watchedBtn = e.target.classList.contains('button-watched');
    const queueBtn = e.target.classList.contains('button-queue');
    const user = getCurrentUser();
    const { watched, queue } = getUserLibraryFromLocalStorage();
    const activeLibrary = libraryButtonRef.classList.contains('site-nav__button--current');
    const activeHome = homeButtonRef.classList.contains('site-nav__button--current');

    if (!user) {
      return Notify.needToSignIn();
    }

    const film = await newFetchApiFilm
      .fetchMovieById(movieId)
      .then(film => film.data)
      .catch(error => {
        console.log(error);
      });

    const watchedFilm = checkFilm(watched, movieId);
    const queuedFilm = checkFilm(queue, movieId);

    // if (activeHome) {
    if (watchedBtn) {
      e.target.textContent === 'add to watched'
        ? (e.target.textContent = 'remove from watched')
        : (e.target.textContent = 'add to watched');

      if (watchedFilm) {
        const index = watched.indexOf(watchedFilm);

        removeFilmFromLocalStorage(watched, index);

        await Database.writeUserLibrary(user, { watched, queue });

        addUserLibraryToLocalStorage(watched, queue);

        if (activeLibrary) {
          renderMarkupAfterChosenFilm(watched);
        }

        return;
      }

      watched.unshift(film);

      await Database.writeUserLibrary(user, { watched, queue });

      if (activeLibrary) {
        renderMarkupAfterChosenFilm(watched);
      }
    }

    if (queueBtn) {
      e.target.textContent === 'add to queue'
        ? (e.target.textContent = 'remove from queue')
        : (e.target.textContent = 'add to queue');

      if (queuedFilm) {
        const index = queue.indexOf(queuedFilm);

        removeFilmFromLocalStorage(queue, index);

        await Database.writeUserLibrary(user, { watched, queue });

        addUserLibraryToLocalStorage(watched, queue);

        if (activeLibrary) {
          renderMarkupAfterChosenFilm(queue);
        }

        return;
      }

      queue.unshift(film);

      await Database.writeUserLibrary(user, { watched, queue });

      if (activeLibrary) {
        renderMarkupAfterChosenFilm(queue);
      }
    }
    // }

    // if (activeLibrary) {
    const watchLibBtn = document.querySelector('[data-action="watched"]');
    const queueLibBtn = document.querySelector('[data-action="queue"]');
    const activeWatchLibBtn = watchLibBtn.classList.contains('button--active');
    const activeQueueLibBtn = queueLibBtn.classList.contains('button--active');

    if (watchedBtn) {
      e.target.textContent === 'add to watched'
        ? (e.target.textContent = 'remove from watched')
        : (e.target.textContent = 'add to watched');

      if (watchedFilm) {
        const index = watched.indexOf(watchedFilm);

        removeFilmFromLocalStorage(watched, index);

        await Database.writeUserLibrary(user, { watched, queue });

        addUserLibraryToLocalStorage(watched, queue);

        if (activeLibrary && !activeQueueLibBtn) {
          renderMarkupAfterChosenFilm(watched);
        }

        return;
      }

      watched.unshift(film);

      await Database.writeUserLibrary(user, { watched, queue });

      if (activeLibrary && !activeQueueLibBtn) {
        renderMarkupAfterChosenFilm(watched);
      }
    }

    if (queueBtn) {
      e.target.textContent === 'add to queue'
        ? (e.target.textContent = 'remove from queue')
        : (e.target.textContent = 'add to queue');

      if (queuedFilm) {
        const index = queue.indexOf(queuedFilm);

        removeFilmFromLocalStorage(queue, index);

        await Database.writeUserLibrary(user, { watched, queue });

        addUserLibraryToLocalStorage(watched, queue);

        if (activeLibrary && !activeWatchLibBtn) {
          renderMarkupAfterChosenFilm(queue);
        }

        return;
      }

      queue.unshift(film);

      await Database.writeUserLibrary(user, { watched, queue });

      if (activeLibrary && !activeWatchLibBtn) {
        renderMarkupAfterChosenFilm(queue);
      }
    }
    // }

    addUserLibraryToLocalStorage(watched, queue);
  } catch (error) {
    console.log(error);
  }
}

function renderMarkupAfterChosenFilm(arr) {
  clearMarkup(listFilmsRef);
  renderMarkup(listFilmsRef, movieCatalogLibraryTpl(arr));
}

function removeFilmFromLocalStorage(arr, index) {
  arr.splice(index, 1);
}

export function checkFilm(arr, movieId) {
  if (!arr) {
    return;
  }

  return arr.find(element => {
    if (element.id === Number(movieId)) {
      return element;
    }
  });
}

export function getUserLibraryFromLocalStorage() {
  const watched = JSON.parse(localStorage.getItem('watched'));
  const queue = JSON.parse(localStorage.getItem('queue'));
  return { watched, queue };
}

export function addUserLibraryToLocalStorage(watched = [], queue = []) {
  localStorage.setItem('watched', JSON.stringify(watched));
  localStorage.setItem('queue', JSON.stringify(queue));
}

export function removeUserLibraryFromLocalStorage() {
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
}

export function saveCurrentUser({ uid, email }) {
  return localStorage.setItem('user', JSON.stringify({ uid, email }));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function removeCurrentUser() {
  return localStorage.removeItem('user');
}
