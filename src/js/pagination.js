import { listFilmsRef } from './common/refs';
import NewFetchApiFilms from './apiService';
import { clearMarkup } from './common/functions';
import { addGenreToFilm } from './provideFilms';
const newFetchApiFilms = new NewFetchApiFilms();

export function pagination() {
  const linkArrowLeftRef = document.querySelector('.pagination__arrow--left');
  const linkArrowRightRef = document.querySelector('.pagination__arrow--right');
  const paginationNumberListRef = document.querySelector('.pagination__number-list');

  paginationNumberListRef.addEventListener('click', switchesPagesFilms);
  linkArrowRightRef.addEventListener('click', switchesPagesFilms);
  linkArrowLeftRef.addEventListener('click', switchesPagesFilms);

  async function switchesPagesFilms(e) {
    e.preventDefault();
    if (e.target.nodeName === 'DIV') {
      return;
    }

    window.scrollTo({ top: 240, behavior: 'smooth' });
    try {
      clearMarkup(listFilmsRef);

      if (e.target.classList.contains('pagination__number')) {
        const num = e.target.textContent;

        newFetchApiFilms.selectsPageNumber(Number(num));
        linkArrowLeftRef.removeAttribute('disabled');
        toggleClassActive(e);

        if (e.target.textContent != 1) {
          linkArrowLeftRef.classList.remove('disabled');
        }
        if (e.target.textContent == 1) {
          linkArrowLeftRef.classList.add('disabled');
        }
        if (e.target.textContent != 500) {
          linkArrowRightRef.classList.remove('disabled');
        }
        if (e.target.textContent == 500) {
          linkArrowRightRef.classList.add('disabled');
        }
      }
      if (e.target.hasAttribute('data-arrow-right')) {
        newFetchApiFilms.incrementPage();
        linkArrowLeftRef.removeAttribute('disabled');
        linkArrowLeftRef.classList.remove('disabled');

        toggleClassActive(e);

        if (paginationNumberListRef.lastElementChild.textContent < newFetchApiFilms.page) {
          const numbers = document.querySelectorAll('.pagination__number');

          numbers.forEach(num => {
            num.textContent = Number(num.textContent) + 1;
            toggleClassActive(e);
          });
          if (newFetchApiFilms.page === 500) {
            linkArrowLeftRef.setAttribute('disabled', true);
            linkArrowLeftRef.classList.add('disabled');
          }
        }
      }
      if (e.target.hasAttribute('data-arrow-left')) {
        newFetchApiFilms.decrementPage();
        toggleClassActive(e);

        if (newFetchApiFilms.page < document.querySelector('.first').textContent) {
          const numbers = document.querySelectorAll('.pagination__number');

          numbers.forEach(num => {
            num.textContent = Number(num.textContent) - 1;
            toggleClassActive(e);
          });
        }

        if (newFetchApiFilms.page === 1) {
          linkArrowLeftRef.setAttribute('disabled', true);
          linkArrowLeftRef.classList.add('disabled');
        }
      }

      const films = await newFetchApiFilms
        .fetchApiPopularFilms()
        .then(response => response.data.results);

      addGenreToFilm(films);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleClassActive(e) {
    removeClassActive(e);
    addClassActive(e);
  }

  function removeClassActive(e) {
    if (!e.target.classList.contains('pagination__number--active')) {
      document
        .querySelectorAll('.pagination__list a')
        .forEach(item => item.classList.remove('pagination__number--active'));

      linkArrowRightRef.classList.remove('pagination__number--active');
    }
  }

  function addClassActive(e) {
    if (
      e.target.classList.contains('pagination__arrow') ||
      e.target.classList.contains('material-icons') ||
      e.target.classList.contains('pagination__number') ||
      e.target.classList.contains('site-nav__button')
    ) {
      document.querySelectorAll('.pagination__number').forEach(item => {
        item.classList.remove('pagination__number--active');

        if (item.textContent == newFetchApiFilms.page) {
          item.classList.add('pagination__number--active');
        }
      });
    }
  }
}
