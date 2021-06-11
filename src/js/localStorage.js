import { renderMarkup, clearMarkup } from './common/functions';
import movieCatalogTpl from '../templates/movieСatalog.hbs';

const libraryRef = document.querySelector('.js-dynamic-container');

let filmsAddWatched = [];
let filmsAddQueue = [];

class Lib {
  constructor(film) {
    this._film = film;
    film.onclick = this.onClick.bind(this); // (*)
  }

  watched() {
    filmsAddWatched = JSON.parse(localStorage.getItem('watched'));
    console.log(filmsAddWatched);

    // clearMarkup();
    renderMarkup(libraryRef, movieCatalogTpl());
  }

  queue() {
    if (filmsAddQueue === null) {
      filmsAddQueue = [];
    }
    filmsAddQueue = JSON.parse(localStorage.getItem('queue'));
    console.log(filmsAddQueue);
    renderMarkup(libraryRef, movieCatalogTpl);
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  }
}

new Lib(libraryRef);
