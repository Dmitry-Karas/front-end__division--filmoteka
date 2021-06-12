import NewFetchApiFilms from './apiService';
import { renderMarkup, clearMarkup } from './common/functions';
import movieCatalogTpl from '../templates/movieСatalog.hbs';
import { listFilmsRef } from './common/refs';
import { Database } from './firebase';

const libraryRef = document.querySelector('.js-dynamic-container');
const { watched, queue } = getUserLibraryFromLocalStorage();
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
    library.watched = JSON.parse(localStorage.getItem('watched'));
    renderMarkup(listFilmsRef, movieCatalogTpl(library.watched));
  }

  queue() {
    clearMarkup(listFilmsRef);
    library.queue = JSON.parse(localStorage.getItem('queue'));
    renderMarkup(listFilmsRef, movieCatalogTpl(library.queue));
  }

  onClick(event) {
    const watchLibBtn = document.querySelector('[data-action="watched"]');
    const queueLibBtn = document.querySelector('[data-action="queue"]');

    let action = event.target.dataset.action;
    event.target.classList.add('button--active');
    if (event.target === watchLibBtn) {
      event.target.classList.add('button--active');
      queueLibBtn.classList.remove('button--active');
    }
    if (event.target === queueLibBtn) {
      event.target.classList.add('button--active');
      watchLibBtn.classList.remove('button--active');
    }
    if (action) {
      this[action]();
    }
  }
}

new Lib(libraryRef);

async function onModalWindow(e) {
  try {
    const modalContainer = document.querySelector('.modal-window');
    const movieId = modalContainer.dataset.id;
    const watchedBtn = e.target.classList.contains('button-watched');
    const queueBtn = e.target.classList.contains('button-queue');
    const user = getCurrentUser();

    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    const film = await newFetchApiFilm
      .fetchMovieById(movieId)
      .then(film => film.data)
      .catch(error => {
        console.log(error);
      });

    if (watchedBtn) {
      e.target.textContent === 'add to watched'
        ? (e.target.textContent = 'remove')
        : (e.target.textContent = 'add to watched');
      const findFilm = watched.find(element => {
        if (element.id === Number(movieId)) {
          return true;
        }
      });

      if (findFilm) {
        const index = watched.indexOf(findFilm);
        watched.splice(index, 1);
        localStorage.setItem('watched', JSON.stringify(watched));
        Database.writeUserLibrary(user, { watched, queue });
        return;
      }

      watched.unshift(film);
      Database.writeUserLibrary(user, { watched, queue });
    }

    if (queueBtn) {
      e.target.textContent === 'add to queue'
        ? (e.target.textContent = 'remove')
        : (e.target.textContent = 'add to queue');
      const findFilm = queue.find(element => {
        if (element.id === Number(movieId)) {
          return true;
        }
      });

      if (findFilm) {
        const index = queue.indexOf(findFilm);
        queue.splice(index, 1);
        localStorage.setItem('queue', JSON.stringify(queue));
        return;
      }

      queue.unshift(film);
    }

    addUserLibraryToLocalStorage(watched, queue);
  } catch (error) {
    console.log(error);
  }
}

export function getUserLibraryFromLocalStorage() {
  const watched = JSON.parse(localStorage.getItem('watched'));
  const queue = JSON.parse(localStorage.getItem('queue'));
  return { watched, queue };
}

export function addUserLibraryToLocalStorage(watched, queue) {
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
